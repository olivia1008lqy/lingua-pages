const assert = require("assert")
const fs = require("fs")
const path = require("path")
const vm = require("vm")

const root = path.resolve(__dirname, "..")
const html = fs.readFileSync(path.join(root, "index.html"), "utf8")
const data = fs.readFileSync(path.join(root, "data.js"), "utf8")
const appSource = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)][0][1]

function makeElement() {
  const classes = new Set()
  return {
    innerHTML: "", textContent: "", style: {}, dataset: {}, disabled: false,
    classList: { add: (...names) => names.forEach(name => classes.add(name)), remove: (...names) => names.forEach(name => classes.delete(name)), contains: name => classes.has(name), toggle: name => classes.has(name) ? (classes.delete(name), false) : (classes.add(name), true) },
    addEventListener(type, handler) { this[`on${type}`] = handler },
    setAttribute(name, value) { this[name] = value },
    querySelector() { return makeElement() }, querySelectorAll() { return [] },
    appendChild() {}, remove() {}, replaceWith() {}, click() {}, focus() {}, cloneNode() { return makeElement() }
  }
}

function createApp(saved = {}) {
  const elements = new Map()
  const storage = new Map(Object.entries(saved))
  const document = {
    body: makeElement(),
    getElementById(id) { if (!elements.has(id)) elements.set(id, makeElement()); return elements.get(id) },
    querySelector() { return makeElement() },
    querySelectorAll() { return [] },
    createElement() { return makeElement() }
  }
  const context = {
    console, document,
    localStorage: { get length() { return storage.size }, key: index => [...storage.keys()][index], getItem: key => storage.has(key) ? storage.get(key) : null, setItem: (key, value) => storage.set(key, String(value)), removeItem: key => storage.delete(key) },
    navigator: {}, location: { reload() {} }, URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} }, Blob: class {},
    FileReader: class {}, Audio: class { play() {} }, SpeechSynthesisUtterance: class {},
    speechSynthesis: { getVoices: () => [], cancel() {}, resume() {}, speak() {} },
    setTimeout: handler => (handler(), 1), clearTimeout() {},
    scrollTo() {}, alert() {}, addEventListener() {}
  }
  context.window = context
  vm.createContext(context)
  vm.runInContext(`${data}\n${appSource}\nthis.__app={
    renderHome,renderStoryTracks,selectTrack,startMission,renderStoryPage,renderMeaningChallenge,renderPracticePage,
    renderVocabularyLab,renderWordBank,startSentenceGame,practiceSentenceSpeech,startReview,renderReviewQuestion,judgePronunciation,
    registerRecognitionFailure,startRecognition,toggleRecording,cleanupAudio,allLessonRecords,updateReviewStrength,
    setLesson(id,index,phase="story"){activeTrackId=id;chapters=storyTracks.find(track=>track.id===id).lessons;chapterIndex=index;lessonPhase=phase;beatIndex=0;pronunciationAttempts=0},
    setProgress(value){trackProgress=value},seedMedia(recorder,stream,recognizer){mediaRecorder=recorder;mediaStream=stream;recognition=recognizer},getState(){return {activeTrackId,chapterIndex,lessonPhase,pronunciationAttempts,reviewReturn}},
    applyTheme,addCoins,updateStreak,startQuiz,renderQuizQuestion,renderShop,getCoins(){return coins},getStreak(){return streak}
  };this.__content={storyTracks};`, context)
  return { app: context.__app, tracks: context.__content.storyTracks, elements, document, context, storage }
}

const fresh = createApp()
assert(fresh.document.getElementById("app").innerHTML.includes("Start your first lesson"), "fresh user home should offer a first lesson")
assert(fresh.document.getElementById("app").innerHTML.includes("💎 0"), "fresh users must start at zero XP")

const returning = createApp({ linguaTrackProgress: JSON.stringify({ mystery: 2 }), linguaActiveTrack: "mystery", linguaChapter: "1" })
assert(returning.document.getElementById("app").innerHTML.includes("2 lessons complete"), "returning progress should render")

for (const track of fresh.tracks) {
  fresh.app.selectTrack(track.id)
  fresh.app.startMission(0)
  const story = fresh.document.getElementById("app").innerHTML
  assert(story.includes(track.lessons[0].title), `${track.id} should open its first story`)
  assert(!story.includes(`>${track.lessons[0].word}<`), `${track.id} story must not reveal its target word`)
  fresh.app.setLesson(track.id, 0, "meaning")
  fresh.app.renderMeaningChallenge()
  assert(fresh.document.getElementById("app").innerHTML.includes("What does this word mean?"), `${track.id} needs a meaning challenge`)
  fresh.app.setLesson(track.id, 1, "meaning")
  fresh.app.renderMeaningChallenge()
  assert(fresh.document.getElementById("app").innerHTML.includes("Which word did you hear?"), `${track.id} needs a listening challenge`)
  fresh.app.setLesson(track.id, 0, "practice")
  fresh.app.renderPracticePage()
  assert(fresh.document.getElementById("reviewLaterBtn"), `${track.id} speaking must have a fallback`)
}

fresh.app.setLesson("mystery", 0, "practice")
fresh.app.renderPracticePage()
fresh.app.judgePronunciation([{ text: "书店", confidence: 0.76 }])
assert(fresh.document.getElementById("feedback").innerHTML.includes("Transcription confidence: 76%"), "correct recognition should report transcription confidence")

fresh.app.setLesson("mystery", 0, "practice")
fresh.app.renderPracticePage()
fresh.app.judgePronunciation([{ text: "咖啡", confidence: 0.8 }])
fresh.app.judgePronunciation([{ text: "咖啡", confidence: 0.8 }])
assert(fresh.document.getElementById("continueBtn").classList.contains("show"), "two mismatches must allow progress")

fresh.app.setLesson("mystery", 0, "practice")
fresh.app.renderPracticePage()
fresh.app.registerRecognitionFailure("No word", "Try again.")
fresh.app.registerRecognitionFailure("No word", "Try again.")
assert(fresh.document.getElementById("continueBtn").classList.contains("show"), "two recognition errors must allow progress")

fresh.app.startRecognition()
assert(fresh.document.getElementById("feedback").innerHTML.includes("Automatic Chinese checking is unavailable"), "unsupported recognition needs self-review guidance")

const denied = createApp()
denied.context.MediaRecorder = class {}
denied.context.navigator.mediaDevices = { getUserMedia: async () => { throw new Error("denied") } }
denied.app.setLesson("mystery", 0, "practice")
denied.app.renderPracticePage()
const deniedCheck = denied.app.toggleRecording().then(() => {
  assert(denied.document.getElementById("feedback").innerHTML.includes("Microphone access is needed"), "denied microphone needs recovery guidance")
})

fresh.app.setProgress({ mystery: 2, cafe: 1, school: 1, postcards: 1, city: 1 })
fresh.app.renderVocabularyLab()
assert(fresh.document.getElementById("labContent").innerHTML.includes("vocab-card"), "word bank should show learned words")
fresh.app.startSentenceGame()
assert(fresh.document.getElementById("labContent").innerHTML.includes("Build the sentence"), "sentence builder should start for learned words")
fresh.app.practiceSentenceSpeech("书店在哪里？")
assert(fresh.document.getElementById("feedback").innerHTML.includes("Speech check unavailable"), "full-sentence practice needs an unsupported-browser fallback")
let sentenceRecognizer
fresh.context.SpeechRecognition = class { constructor() { sentenceRecognizer = this } start() {} abort() {} }
fresh.app.practiceSentenceSpeech("书店在哪里？")
sentenceRecognizer.onresult({ results: [[{ transcript: "书店在哪里" }]] })
assert(fresh.document.getElementById("feedback").innerHTML.includes("Complete sentence matched"), "full-sentence recognition should accept a correct phrase")
fresh.app.practiceSentenceSpeech("书店在哪里？")
sentenceRecognizer.onresult({ results: [[{ transcript: "我要咖啡" }]] })
assert(fresh.document.getElementById("feedback").innerHTML.includes("Try the full sentence again"), "full-sentence recognition should reject an incorrect phrase")

fresh.app.startReview([fresh.tracks[0].lessons[0]], true, "home")
assert(fresh.document.getElementById("app").innerHTML.includes("Daily Review"), "daily review should start")

const quiz = createApp({ linguaTrackProgress: JSON.stringify({ mystery: 1 }) })
quiz.app.startQuiz()
assert(quiz.document.getElementById("app").innerHTML.includes("Word Quiz"), "quiz should start once words are learned")
assert(quiz.document.getElementById("headerProgress").style.display === "block", "quiz should show progress in the header bar")
quiz.app.addCoins(50)
assert.equal(quiz.storage.get("linguaCoins"), "50", "coins should persist to storage")
quiz.app.renderShop()
assert(quiz.document.getElementById("app").innerHTML.includes("Moonlight Shop"), "shop should render")
quiz.app.updateStreak()
assert(Number(quiz.storage.get("linguaStreak")) >= 0, "streak should initialize without error")
quiz.app.applyTheme("midnight")
assert.equal(quiz.document.body["data-theme"], "midnight", "purchased theme should apply to the document body")

const economy = createApp()
economy.app.updateReviewStrength("mystery-0", true)
assert.equal(economy.storage.get("linguaReviewXp"), "5", "first correct recall earns the level-1 milestone")
economy.app.updateReviewStrength("mystery-0", true)
economy.app.updateReviewStrength("mystery-0", true)
economy.app.updateReviewStrength("mystery-0", true)
assert.equal(economy.storage.get("linguaReviewXp"), "25", "strength milestones cap at level 4")
economy.app.updateReviewStrength("mystery-0", false)
assert.equal(economy.storage.get("linguaReviewXp"), "25", "a miss must not re-award XP")
economy.app.updateReviewStrength("mystery-0", true)
assert.equal(economy.storage.get("linguaReviewXp"), "25", "re-learning an earned level earns no new XP")

const fullyBounded = createApp()
const curriculumLessons = fresh.tracks.reduce((sum, track) => sum + track.lessons.length, 0)
fullyBounded.app.setProgress(Object.fromEntries(fresh.tracks.map(track => [track.id, track.lessons.length])))
fullyBounded.app.renderHome()
assert(fullyBounded.document.getElementById("app").innerHTML.includes(`💎 ${curriculumLessons * 20}`), "lesson XP must be bounded by the lesson curriculum")
for (let repeat = 0; repeat < 60; repeat++) fullyBounded.app.updateReviewStrength("cafe-0", true)
assert.equal(fullyBounded.storage.get("linguaReviewXp"), "25", "repeated correct reviews must not exceed the per-word milestone cap")
assert(Number(fullyBounded.storage.get("linguaReviewXp") || 0) <= curriculumLessons * 20 + 25, "total XP must stay bounded even under repeated reviews")

assert(/@media\(max-width:720px\)/.test(html) && /env\(safe-area-inset-top\)/.test(html), "mobile layout needs a breakpoint and safe-area support")
let stopped = 0
fresh.app.seedMedia({ state: "recording", stop() { stopped++ } }, { getTracks: () => [{ stop() { stopped++ } }] }, { abort() { stopped++ } })
fresh.app.cleanupAudio()
assert.equal(stopped, 3, "navigation cleanup must stop recording, recognition, and media tracks")

deniedCheck.then(() => console.log("MVP logic checks passed: fresh/returning users, 7 tracks, lesson variants, permission and speech fallbacks, active-media cleanup, Lab, review, quiz, shop, coins, streaks, themes, and mobile CSS"))
