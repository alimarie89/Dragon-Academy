// Complete practices data with full details
const practicesData = [
  {
    id: "F-1",
    title: "Avocado (Hard Stop)",
    session: "foundational",
    sessionLabel: "Foundational",
    format: "any",
    level: "beginner",
    duration: "Instant",
    skills: ["regulation", "boundaries"],
    topics: ["consent", "safety", "nervous-system"],
    what: "A shared, unambiguous signal that stops any practice immediately. This is the container's bedrock. Without it, nothing else is safe enough to be real.",
    how: "Say 'avocado' at any volume, at any point. Everything stops. No explanation required. No questions asked until you're ready. The space resets. You can process what happened when you choose to.",
    note: "Using avocado isn't failure. It's the practice working exactly as designed."
  },
  {
    id: "F-2",
    title: "Color Code",
    session: "foundational",
    sessionLabel: "Foundational",
    format: "any",
    level: "beginner",
    duration: "1 min",
    skills: ["self-location", "regulation", "attunement"],
    topics: ["nervous-system", "state", "field"],
    what: "A shared language for reporting nervous system activation in real time — so the room doesn't have to guess, and you don't have to explain.",
    how: "<strong>Green</strong> — present, resourced, available<br/><strong>Yellow</strong> — activation rising, still functional, tracking carefully<br/><strong>Orange</strong> — significant activation, capacity reduced, need a pause<br/><strong>Red</strong> — overwhelmed, need to stop",
    use: "Name your color out loud or in chat. Facilitators track the field — three yellows in a row is a signal to adjust pace or container."
  },
  {
    id: "F-3",
    title: "State Truth / Opening Ritual",
    session: "foundational",
    sessionLabel: "Foundational",
    format: "dyad,group",
    level: "beginner",
    duration: "3–5 min",
    skills: ["self-location", "presence", "truth-telling"],
    topics: ["state", "arrival", "instinct"],
    what: "The ability to locate yourself in the present moment before anything else begins. You can't orient to others if you haven't oriented to yourself first.",
    how: "1. Name your current internal condition — one word or short phrase. 'Nervous.' 'Open.' 'Scattered.' 'Tender.' 'Guarded.' No story. No explanation.<br/>2. Partner reflects it back as 'you': 'You're nervous.' No warmth added, no interpretation. Just the mirror.<br/>3. Continue for 2 minutes. Switch.",
    note: "Pitfalls: Adding 'because' (that's story, not state), performing vulnerability instead of reporting it, partner softening the reflection."
  },
  {
    id: "F-4",
    title: "Synthesis / Distillation",
    session: "foundational",
    sessionLabel: "Foundational",
    format: "dyad",
    level: "intermediate",
    duration: "2–3 min",
    skills: ["attunement", "witnessing", "contact"],
    topics: ["interplay", "state", "receiving"],
    what: "Offering felt understanding rather than just mirroring. After a partner has expressed several things, you pause and name the underlying essence — one sentence. They confirm, correct, or go deeper.",
    example: "Instead of reflecting each state back one by one, you listen through several rounds and then offer: <em>'You're carrying a lot and what you most want is to be allowed to rest.'</em>",
    gift: "When someone distills you accurately, it can feel more seen than hours of processing. When they get it wrong, you find out what's actually true."
  },
  {
    id: "S1-1",
    title: "Sensation Scan",
    session: "1",
    sessionLabel: "Session 1: Instinct",
    format: "solo,dyad",
    level: "beginner",
    duration: "5–8 min",
    skills: ["presence", "self-location", "attunement"],
    topics: ["sensation", "body", "instinct", "nervous-system"],
    what: "The ability to locate yourself physically before locating yourself relationally. Most people are in their heads by default. This drops you back into the body as the primary instrument of intelligence.",
    how: "1. Close your eyes. Note sensations silently, one at a time. Warmth. Pressure. Numbness. Tingling. Tightness. Openness. Not analyzing — reporting.<br/>2. After a minute, gently amplify. Add breath. Adjust posture. Place a hand on your heart or belly. Sway. Get on all fours if that's what wants to happen.<br/>3. Before opening your eyes: is there a part of you that wants to be seen right now? Or stay hidden? Don't change anything. Just notice.<br/>4. Open your eyes. Include your partner. Notice how sensation begins to organize into direction — a lean, a pull, a guarding, a stillness. Name what you notice, popcorn style.",
    key: "That emerging direction is instinct. Not a thought about what you should feel. The body's actual signal."
  },
  {
    id: "S1-2",
    title: "Instinctive Currents",
    session: "1",
    sessionLabel: "Session 1: Instinct",
    format: "dyad",
    level: "beginner",
    duration: "15–20 min (all four parts)",
    skills: ["self-location", "truth-telling", "expressing-desire", "boundaries", "contact"],
    topics: ["instinct", "hunger", "aggression", "protection", "eros", "body"],
    what: "Recognizing the four basic flavors of life force — not as roles to perform but as real currents that shape behavior. Most people have shut one or more of these down entirely. The practice makes them visible and voluntary.",
    note: "Four parts: Hunger (moving toward nourishment), Aggression (force that creates movement), Protection (preserves safety/capacity), Eros (all three in balance)."
  },
  {
    id: "S1-3",
    title: "How Do I Want to Consume You?",
    session: "1",
    sessionLabel: "Session 1: Instinct",
    format: "dyad",
    level: "intermediate",
    duration: "10–12 min",
    skills: ["expressing-desire", "receiving", "boundaries", "contact"],
    topics: ["hunger", "desire", "instinct", "eros"],
    what: "The full arc of desire — from noticing what you want, to making a clean request, to allowing the response to land. Most people either don't ask or ask in a way that collapses their power.",
    menu: "<em>Attention</em> — 'I want your full gaze on me for one minute.'<br/><em>Desire</em> — 'I want to hear that you want more of me.'<br/><em>Intensity</em> — 'I want you to describe how you would contain me.'<br/><em>Power/orientation</em> — 'I want you to tell me what to do for one minute.'<br/><em>Care/holding</em> — 'I want to feel your warmth.'<br/><em>Vulnerability</em> — 'I want you to say things that make me feel exposed and seen.'"
  }
];

// Practice library for S2, S3, S4, S5, S6, S7... (continued in separate sections for readability)
const practicesDataS2 = [
  {
    id: "S2-1",
    title: "State Truth (Reverse Interplay)",
    session: "2",
    sessionLabel: "Session 2: Truth-Telling & Box of Self",
    format: "dyad",
    level: "beginner",
    duration: "5–8 min",
    skills: ["self-location", "truth-telling", "presence"],
    topics: ["state", "instinct", "truth", "nervous-system"],
    what: "The ability to locate yourself in your internal condition before locating yourself relationally.",
    additional: "Track the difference between a state name ('nervous') and a story about a state ('nervous because of what happened last week'). State Truth is only the name. Everything else is processing."
  },
  {
    id: "S2-2",
    title: "Naming Your Lean",
    session: "2",
    sessionLabel: "Session 2: Truth-Telling & Box of Self",
    format: "dyad,group",
    level: "beginner",
    duration: "3–5 min",
    skills: ["self-location", "truth-telling", "attunement"],
    topics: ["lean", "instinct", "truth", "body"],
    what: "Tracking instinctive direction toward another person without adding meaning, story, or permanence. Lean is present-time. It doesn't require explanation and it shifts.",
    examples: "'I feel drawn toward you.' / 'I feel some aversion.' / 'I'm neutral.' / 'I'm confused about you.' / 'I don't trust you yet.'",
    key: "Lean is not a verdict. It's your organism reporting how contact is landing in this moment — and it will change."
  },
  {
    id: "S2-3",
    title: "Box of Self Reveals",
    session: "2",
    sessionLabel: "Session 2: Truth-Telling & Box of Self",
    format: "dyad,group",
    level: "intermediate",
    duration: "8–12 min",
    skills: ["shadow-work", "attunement", "truth-telling", "receiving"],
    topics: ["box-of-self", "shadow", "truth", "body"],
    what: "Making visible the stable patterns in how someone organizes contact over time — not what's happening right now, but what repeats. This layer reveals structure, not identity.",
    format_examples: "Light: warm, grounded, spacious, someone who cares, steady, open<br/>Shadow: intense, closed off, too much, someone who would dominate, guarded, hard to reach"
  },
  {
    id: "S2-4",
    title: "Spicy Relational Truth",
    session: "2",
    sessionLabel: "Session 2: Truth-Telling & Box of Self",
    format: "dyad,group",
    level: "intermediate",
    duration: "5–8 min",
    skills: ["truth-telling", "expressing-desire", "contact", "resilience-under-pressure"],
    topics: ["truth", "lean", "shadow", "belonging", "eros"],
    what: "Naming the truths that carry consequence — the ones most often edited to preserve safety, approval, or belonging.",
    examples: "'I don't trust you yet.' / 'I feel intimidated by you.' / 'I want your approval.' / 'I'm drawn to you, and that makes me nervous.' / 'I don't like how you take up space.'"
  }
];

const practicesDataS3 = [
  {
    id: "S3-1",
    title: "Watermelon",
    session: "3",
    sessionLabel: "Session 3: Interplay",
    format: "dyad",
    level: "beginner",
    duration: "4–6 min",
    skills: ["presence", "attunement", "contact"],
    topics: ["body", "interplay", "state", "instinct"],
    what: "Communicating truth through the body rather than words. Strips away verbal content so both partners have to rely on tone, posture, and micro-expression.",
    how: "1. Partner A says only the word 'watermelon' in various ways.<br/>2. Partner B tracks the state behind how it's said: 'You're settling in.' / 'You're playful.' / 'You're coming toward me.' / 'You're guarded.'<br/>3. 2 minutes each way.",
    why: "By limiting vocabulary to one word, you can't hide behind explanation. The body becomes the text. This trains both partners to notice micro-shifts."
  },
  {
    id: "S3-2",
    title: "Resting in the Repetition",
    session: "3",
    sessionLabel: "Session 3: Interplay",
    format: "dyad",
    level: "beginner",
    duration: "4–6 min",
    skills: ["presence", "attunement", "receiving"],
    topics: ["interplay", "contact", "body", "state"],
    what: "Trusting the body to know when something has been fully contacted, rather than jumping ahead. Most people leave experiences before they've actually arrived.",
    insight: "It often takes 3–4 repetitions before you can even tell if a state is accurate. Staying in a 'wrong' state is often where the real truth lights up."
  },
  {
    id: "S3-3",
    title: "Core Interplay",
    session: "3",
    sessionLabel: "Session 3: Interplay",
    format: "dyad",
    level: "beginner",
    duration: "5–20 min",
    skills: ["presence", "contact", "attunement", "self-location", "resilience-under-pressure"],
    topics: ["interplay", "contact", "nervous-system", "body", "the-hole", "freeze"],
    what: "Staying in contact — the nervous-system experience of mutual presence — under relational pressure. Interplay reveals survival strategies faster than months of normal relating.",
    principles: "1. Commit to presence<br/>2. Stay in your body; let their states come to you<br/>3. Show, don't tell<br/>4. Rest in the repetition<br/>5. Name shifts<br/>6. Let yourself be impacted<br/>7. Stop at any time — avocado"
  },
  {
    id: "S3-4",
    title: "Getting Out of the Hole",
    session: "3",
    sessionLabel: "Session 3: Interplay",
    format: "dyad",
    level: "intermediate",
    duration: "5–10 min",
    skills: ["presence", "self-location", "resilience-under-pressure", "regulation"],
    topics: ["the-hole", "freeze", "interplay", "contact", "nervous-system"],
    what: "Recognizing when attention has collapsed inward — the freeze, the blank, the frantic thinking — and reclaiming agency by orienting outward.",
    hole_looks: "Blank eyes, head moving forward, stuttering rhythm, frantic internal searching",
    way_out: "Point attention to something outside yourself — your partner's physical features, a sound, the room. The hole only survives in inward-focused attention."
  },
  {
    id: "S3-5",
    title: "Demands in Interplay",
    session: "3",
    sessionLabel: "Session 3: Interplay",
    format: "dyad",
    level: "intermediate",
    duration: "8–12 min",
    skills: ["boundaries", "power", "contact", "resilience-under-pressure", "expressing-desire"],
    topics: ["interplay", "contact", "choice", "power", "pressure"],
    what: "Navigating power dynamics, energetic boundaries, and centeredness when desire or pressure arrives — without automatically complying, resisting, or explaining.",
    options: "Three options: Meet the demand, Decline, Modify it",
    key: "The question is what happens in your body when a demand arrives. Do your options narrow to one? That's the pattern."
  }
];

const allPractices = [...practicesData, ...practicesDataS2, ...practicesDataS3];
