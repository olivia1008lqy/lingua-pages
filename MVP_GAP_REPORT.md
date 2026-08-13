# Lingua Pages MVP gap report

Reviewed August 13, 2026. This report covers the static GitHub Pages MVP after integrating the supplied working version with the repository's newer lesson-flow work.

## Priority 0 — required before real-user testing

- Run hands-on checks on current iPhone Safari and Android Chrome with real microphone permission prompts. Automated local browser access was unavailable during this review, so device media behavior still needs physical-device confirmation.
- Add a short, explicit testing privacy notice that browser speech recognition may use the browser or operating-system provider's online speech service. Lingua Pages itself does not upload recordings, but provider behavior is outside the app's control.
- Recruit only a small supervised pilot until lesson content, tone guidance, and translations have been reviewed by a qualified Mandarin instructor.

## Priority 1 — important MVP gaps

- **Pronunciation feedback:** Browser transcription is only a tolerant phrase match. It cannot measure tones, initials/finals, fluency, or pronunciation quality. Confidence, when supplied, is transcription confidence—not a pronunciation score.
- **iPhone/Safari:** Speech recognition availability varies. Recording/replay and the external Voice Memos fallback prevent blocking, but the full fallback must be verified on devices and older supported Safari versions.
- **Curriculum:** The 22 lessons provide useful breadth but not a sequenced grammar syllabus, controlled vocabulary recycling, diagnostic placement, or instructor-reviewed proficiency outcomes.
- **Challenge variety:** Lessons alternate meaning and listening before speaking, and the Lab adds recall and sentence building. More production, cloze, ordering, role-play, and delayed-recall formats are still needed.
- **Accessibility:** Keyboard focus, live feedback, reduced motion, language tags, and mobile targets are present. A screen-reader audit, zoom/reflow test, contrast measurement, and VoiceOver/TalkBack device pass remain outstanding.
- **Progress and rewards:** XP is now bounded and milestone-based (one-time rewards per spaced-repetition strength level, tested to cap per word). Still missing: a visible daily-streak tracker, explicit milestone definitions in the UI, and economy tuning against the pilot.
- **State management:** Progress is local to one browser and can be exported/imported. There is no schema migration layer, cross-device sync, conflict handling, or recovery from browser storage clearing.
- **Content operations:** Lessons are stored in a JavaScript data file. There is no authoring workflow, content validation service, localization pipeline, or release versioning for curriculum changes.

## Priority 2 — polish and expansion

- Replace remaining decorative emoji with a consistent adult visual system and commissioned story art.
- Add richer episode transitions and an explicit “next scene unlocked” moment without turning rewards into a childlike game layer.
- Expand spaced practice beyond meaning recall to listening, sentence reconstruction, and contextual production.
- Add learner controls for audio rate, preferred voice, pinyin visibility, captions, and reduced sensory load.
- Add non-invasive, consent-based product analytics for lesson starts, exits, retries, fallbacks, and review retention.

## Fixed in this pass

- Kept story and challenge screens separate and hid unrevealed target vocabulary on lesson cards.
- Added a visible Review later path so recording or recognition can never permanently block progress.
- Counted recognition errors and no-match events toward the two-attempt fallback.
- Improved microphone-denied and unsupported-recording guidance, including iPhone self-review fallback copy.
- Preserved review history when rescheduling a learned word.
- Returned Vocabulary Lab meaning practice to the Lab instead of the story track.
- Prevented sentence practice from introducing unlearned fallback words.
- Added accessible expanded state to the context-phrase control.
- Restricted progress imports to known keys, string values, and a 1 MB file limit.
- Added an explicit testing notice that browser speech recognition may use the browser or operating system provider's online speech service, which is outside the app's control.
- Replaced unbounded recall XP with one-time strength-milestone rewards (levels 1–3 worth 5 XP, mastery 10 XP) so repeated reviews can no longer farm XP; rewards are now bounded per word.

## Requires a backend or specialist API

- Accounts, cross-device sync, classroom/cohort management, durable analytics, experiments, and remote curriculum delivery require a backend.
- Valid pronunciation and tone assessment requires a Mandarin-capable specialist scoring API plus transparent confidence thresholds, consent, retention rules, and human validation. Browser SpeechRecognition must not be presented as that capability.
- Secure server-side progress, deletion/export requests, abuse monitoring, and auditable privacy controls require authenticated services and operational policies.

## Security and privacy notes

- The current app has no account system, server database, third-party scripts, or app-owned audio upload path.
- Recordings are held in memory as object URLs and revoked on navigation; media tracks and recognition sessions are stopped during cleanup.
- Local progress and exported backups are not encrypted. Users should treat exported JSON as personal learning data.
- Before production, add a Content Security Policy, formal privacy notice, dependency/security review, and documented browser speech-provider behavior.
