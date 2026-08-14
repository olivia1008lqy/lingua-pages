const assert = require("assert")
const fs = require("fs")
const path = require("path")
const vm = require("vm")

const root = path.resolve(__dirname, "..")
const html = fs.readFileSync(path.join(root, "index.html"), "utf8")
const dataSource = fs.readFileSync(path.join(root, "data.js"), "utf8")
const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1])

assert.equal(inlineScripts.length, 1, "expected one inline application script")
new Function(inlineScripts[0])

const context = {}
vm.createContext(context)
vm.runInContext(`${dataSource}\nthis.__content={storyTracks,trackGuides,lessonExamples,sentencePractice,comics}`, context)
const { storyTracks, trackGuides, lessonExamples, sentencePractice } = context.__content

assert.equal(storyTracks.length, 7, "expected seven story tracks")
assert.deepEqual(storyTracks.map(track => track.id), ["mystery", "cafe", "school", "postcards", "city", "festival", "food"])
assert.deepEqual(storyTracks.map(track => trackGuides[track.id].name), ["Lila", "Mei", "Lan", "Ava", "Jiayi", "Yue", "Zhao"])

for (const track of storyTracks) {
  assert(track.lessons.length >= 4, `${track.id} needs a usable lesson sequence`)
  for (const lesson of track.lessons) {
    assert(lesson.beats?.length >= 2, `${track.id}/${lesson.title} needs separate story beats`)
    assert(lesson.scene?.choices.includes(lesson.scene.answer), `${track.id}/${lesson.title} has an invalid scene answer`)
    assert(lesson.word && lesson.pinyin && lesson.meaning && lesson.tip, `${track.id}/${lesson.title} is missing target data`)
    assert(lessonExamples[lesson.word], `${track.id}/${lesson.title} is missing a context phrase`)
  }
}

assert(sentencePractice.length >= 5, "expected sentence practice across the curriculum")
assert(html.includes('id="reviewLaterBtn"'), "speaking practice needs a non-blocking fallback")
assert(html.includes("registerRecognitionFailure"), "speech failures need attempt tracking")
assert(html.includes("cleanupAudio()"), "navigation must clean up active media")
assert(html.includes('showFeedback("error","Try another answer"'), "meaning challenges need an incorrect-answer branch")
assert(html.includes('showFeedback("success","Correct"'), "meaning challenges need a correct-answer branch")
assert(!html.includes("pronunciation score"), "browser transcription must not be described as pronunciation scoring")
assert(html.includes("linguaReviewXp"), "review XP must use the bounded milestone counter")
assert(!html.includes("reviewCorrect*5"), "unbounded recall XP must be removed")

console.log(`MVP static checks passed: ${storyTracks.length} tracks, ${storyTracks.reduce((sum, track) => sum + track.lessons.length, 0)} lessons`)
