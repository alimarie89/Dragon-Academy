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

const practicesDataS4 = [
  {
    id: "S4-1",
    title: "Morality Interplay",
    session: "4",
    sessionLabel: "Session 4: Authorship & Shared Spine",
    format: "dyad",
    level: "intermediate",
    duration: "10–15 min",
    skills: ["authorship", "integrity", "presence", "boundaries"],
    topics: ["morality", "integrity", "authority", "power"],
    what: "Transform charged moral statements from objective claims into subjective experience. Practice staying present when someone tries to make you wrong and force them to own their position.",
    example: "'You think I shouldn't have done that?' — this move makes it clear the statement is their fence, not universal law."
  },
  {
    id: "S4-2",
    title: "Authorship Power Dyad",
    session: "4",
    sessionLabel: "Session 4: Authorship & Shared Spine",
    format: "dyad",
    level: "intermediate",
    duration: "12–18 min",
    skills: ["authorship", "power", "contact", "authority"],
    topics: ["author", "authority", "authenticity", "shared-spine"],
    what: "One person practices claiming their own internal pen while the other applies pressure or disagreement. The goal is to notice when you begin outsourcing your choice, and to recover authorship in real time."
  }
];

const practicesDataS5 = [
  {
    id: "S5-1",
    title: "Settling Style Identification",
    session: "5",
    sessionLabel: "Session 5: Settling Styles & Completion",
    format: "solo,dyad",
    level: "beginner",
    duration: "8–12 min",
    skills: ["self-awareness", "regulation", "communication"],
    topics: ["settling-styles", "completion", "needs"],
    what: "Identify the way your nervous system needs to return to available. Name whether you are primarily Relational, Somatic, Functional, Intrinsic, or Cognitive in how you settle."
  },
  {
    id: "S5-2",
    title: "Interplay with Settling Styles",
    session: "5",
    sessionLabel: "Session 5: Settling Styles & Completion",
    format: "dyad",
    level: "intermediate",
    duration: "12–18 min",
    skills: ["contact", "completion", "boundaries", "empathy"],
    topics: ["settling", "completion", "interplay"],
    what: "Practice staying with another person after activation while honoring each other's settling styles. Notice when you default to your own need instead of supporting theirs."
  },
  {
    id: "S5-3",
    title: "Requesting a Different Settling Style",
    session: "5",
    sessionLabel: "Session 5: Settling Styles & Completion",
    format: "small-group",
    level: "intermediate",
    duration: "10–15 min",
    skills: ["communication", "requesting", "boundary-setting"],
    topics: ["settling", "request", "needs"],
    what: "Ask your partner for the settling style you need in that moment, even if it's not what they default to. Practice receiving the request without making it about your own comfort."
  }
];

const practicesDataS6 = [
  {
    id: "S6-1",
    title: "Getting Out of the Hole",
    session: "6",
    sessionLabel: "Session 6: Threat",
    format: "dyad",
    level: "intermediate",
    duration: "6–10 min",
    skills: ["self-awareness", "external-attention", "regulation"],
    topics: ["the-hole", "freeze", "threat", "attention"],
    what: "Name observable external shifts when someone collapses inward under perceived threat. The practice is restoring outward attention by anchoring to something real."
  },
  {
    id: "S6-2",
    title: "Get Under It (Threat Reverse Interplay)",
    session: "6",
    sessionLabel: "Session 6: Threat",
    format: "dyad",
    level: "intermediate",
    duration: "8–12 min",
    skills: ["depth", "ownership", "truth-telling"],
    topics: ["threat", "protection", "pattern", "alarm"],
    what: "Move beneath behavior to the perceived danger driving protection. Name the hidden fear or threat without story. 'I feel scared you'll leave' or 'I feel scared I'll be judged.'"
  },
  {
    id: "S6-3",
    title: "Attentional Warm-Up (Me/You Anchoring)",
    session: "6",
    sessionLabel: "Session 6: Threat",
    format: "dyad",
    level: "beginner",
    duration: "5–8 min",
    skills: ["attunement", "focus", "self-location"],
    topics: ["attention", "me-you", "safety"],
    what: "Practice moving attention between yourself and another person using simple anchors. This builds the muscle of not collapsing into one orientation when the field becomes charged."
  }
];

const practicesDataS7 = [
  {
    id: "S7-1",
    title: "Range Collapse (Full Group)",
    session: "7",
    sessionLabel: "Session 7: Power",
    format: "group",
    level: "intermediate",
    duration: "10–15 min",
    skills: ["power", "choice", "presence"],
    topics: ["range", "capacity", "reactivity"],
    what: "In a charged group scenario, practice first embodying your default response, then moving to the opposite extreme, and finally choosing consciously. This reveals where your range narrows under pressure."
  },
  {
    id: "S7-2",
    title: "Power Channel Dyads",
    session: "7",
    sessionLabel: "Session 7: Power",
    format: "dyad",
    level: "intermediate",
    duration: "12–18 min",
    skills: ["personal-power", "relational-power", "awareness"],
    topics: ["power", "channel", "range", "capacity"],
    what: "Practice embodying full personal power and then full relational power. Notice how each channel feels and where your nervous system collapses first."
  },
  {
    id: "S7-3",
    title: "Pressure Test (Hot Seat)",
    session: "7",
    sessionLabel: "Session 7: Power",
    format: "dyad",
    level: "intermediate",
    duration: "10–14 min",
    skills: ["power", "resilience", "presence"],
    topics: ["pressure", "power", "choice", "boundaries"],
    what: "One partner holds a genuine position while the other applies real social pressure. The holder practices staying in power without dominating. The facilitator names the exact moment the field shifts."
  },
  {
    id: "S7-4",
    title: "Yield vs. Collapse (Somatic Dyad)",
    session: "7",
    sessionLabel: "Session 7: Power",
    format: "dyad",
    level: "intermediate",
    duration: "8–12 min",
    skills: ["somatic-awareness", "power", "presence"],
    topics: ["yield", "collapse", "surrender", "power"],
    what: "One partner extends an open hand, the other rests theirs on top. Practice resisting, yielding, and collapsing. Notice the distinct internal sensations of each."
  }
];

const practicesDataS8 = [
  {
    id: "S8-1",
    title: "From Charge to Signal",
    session: "8",
    sessionLabel: "Session 8: Vulnerability as Power",
    format: "solo,dyad",
    level: "intermediate",
    duration: "12–18 min",
    skills: ["vulnerability", "signal", "regulation", "self-awareness"],
    topics: ["vulnerability", "charge", "signal", "contact"],
    what: "Journal a charged situation, identify whether your current strategy is opacity or flooding, and then translate the underlying truth into a calibrated signal. Ask: do I want to punish or be felt?"
  }
];

const practicesDataS9 = [
  {
    id: "S9-1",
    title: "The Transmission Game",
    session: "9",
    sessionLabel: "Session 9: Vulnerability, Power & Presence",
    format: "group",
    level: "intermediate",
    duration: "10–15 min",
    skills: ["signal", "presence", "receiving"],
    topics: ["vulnerability", "presence", "charge"],
    what: "In the full group, transmit an emotion at full volume, then transmit the same state as a precise contained signal. Then dyads practice sending and reflecting on what landed."
  },
  {
    id: "S9-2",
    title: "From Charge to Signal (Dyad)",
    session: "9",
    sessionLabel: "Session 9: Vulnerability, Power & Presence",
    format: "dyad",
    level: "intermediate",
    duration: "12–18 min",
    skills: ["vulnerability", "signal", "reflection", "presence"],
    topics: ["vulnerability", "charge", "presence"],
    what: "Solo journaling followed by dyad practice. Sender delivers one signal sentence. Receiver reflects back what they heard, then names one moment they felt charge arrive and one moment the signal landed."
  },
  {
    id: "S9-3",
    title: "The Warning Signal (Groups of 3)",
    session: "9",
    sessionLabel: "Session 9: Vulnerability, Power & Presence",
    format: "triad",
    level: "intermediate",
    duration: "12–16 min",
    skills: ["presence", "tracking", "witnessing"],
    topics: ["vulnerability", "presence", "receiver"],
    what: "Person A approaches with vulnerability. Person B names body activation before responding. Person C witnesses without speaking, tracking when contact was felt vs lost."
  },
  {
    id: "S9-4",
    title: "One Signal This Week (Dragon Nests)",
    session: "9",
    sessionLabel: "Session 9: Vulnerability, Power & Presence",
    format: "small-group",
    level: "beginner",
    duration: "ongoing",
    skills: ["vulnerability", "courage", "practice"],
    topics: ["vulnerability", "nest", "integration"],
    what: "Commit to delivering one calibrated signal in your small peer group before the next meeting. The work is in doing it outside the container."
  }
];

const practicesDataS10 = [
  {
    id: "S10-1",
    title: "Flooding Practice",
    session: "10",
    sessionLabel: "Session 10: Relational Charge, Feedback & Repair",
    format: "dyad",
    level: "intermediate",
    duration: "10–15 min",
    skills: ["charge-awareness", "boundary", "self-location", "feedback"],
    topics: ["charge", "flooding", "feedback"],
    what: "Partner A intentionally floods while Partner B stays in their own experience and names what is happening for them. Then switch roles. The goal is learning what floods feel like from both sides."
  },
  {
    id: "S10-2",
    title: "The Gap Practice",
    session: "10",
    sessionLabel: "Session 10: Relational Charge, Feedback & Repair",
    format: "dyad",
    level: "intermediate",
    duration: "10–15 min",
    skills: ["regulation", "metabolizing", "feedback"],
    topics: ["charge", "pause", "repair"],
    what: "Practice pausing after charge lands and naming one sentence at a time. The gap between activation and speech is the place where clarity emerges."
  },
  {
    id: "S10-3",
    title: "Charged Triads",
    session: "10",
    sessionLabel: "Session 10: Relational Charge, Feedback & Repair",
    format: "triad",
    level: "intermediate",
    duration: "12–18 min",
    skills: ["feedback", "repair", "courage"],
    topics: ["charge", "impact", "repair"],
    what: "Sharer brings something real. Responder reacts honestly. Sharer practices finding vulnerability beneath the impulse to defend or collapse. Third person witnesses the field."
  },
  {
    id: "S10-4",
    title: "Live Feedback Practice",
    session: "10",
    sessionLabel: "Session 10: Relational Charge, Feedback & Repair",
    format: "dyad",
    level: "intermediate",
    duration: "10–15 min",
    skills: ["feedback", "ownership", "clarity"],
    topics: ["feedback", "impact", "observation"],
    what: "Bring real feedback you've been holding. Use the format: 'When you said/did ___, what happened in me was ___.' Then stop. The focus is on specific observable behavior and your internal experience."
  }
];

const practicesDataS11 = [
  {
    id: "S11-1",
    title: "The Revelation Circle — Full Group",
    session: "11",
    sessionLabel: "Session 11: Final Session",
    format: "group",
    level: "advanced",
    duration: "20–30 min",
    skills: ["revelation", "charge", "presence", "receiving"],
    topics: ["revelation", "vulnerability", "contact"],
    what: "A full-group format for sharing something charged with a specific person, in service of more connection. Direct address. Brief pause. Receiver receives without immediate response."
  },
  {
    id: "S11-2",
    title: "Revelation Breakout Rooms",
    session: "11",
    sessionLabel: "Session 11: Final Session",
    format: "small-group",
    level: "advanced",
    duration: "20–30 min",
    skills: ["vulnerability", "feedback", "repair", "connection"],
    topics: ["revelation", "charge", "field", "intention"],
    what: "Smaller groups share revelations with selected people from the room. The emphasis is on real charge, clear intention, and metabolized signal rather than hot discharge."
  },
  {
    id: "S11-3",
    title: "Return to Full Circle",
    session: "11",
    sessionLabel: "Session 11: Final Session",
    format: "group",
    level: "advanced",
    duration: "15–25 min",
    skills: ["integration", "presence", "holding"],
    topics: ["revelation", "integration", "completion"],
    what: "The full group returns to the circle to process what landed, what shifted, and how the field changed. The emphasis is on presence and staying in the body while real feedback is offered."
  },
  {
    id: "S11-4",
    title: "Appreciations as Completion",
    session: "11",
    sessionLabel: "Session 11: Final Session",
    format: "group",
    level: "beginner",
    duration: "8–12 min",
    skills: ["appreciation", "completion", "connection"],
    topics: ["completion", "closing", "gratitude"],
    what: "Closing the circle with appreciations that carry real charge — not generic praise, but specific acknowledgments of how someone impacted you. This is used as a practice of completion."
  }
];

const allPractices = [...practicesData, ...practicesDataS2, ...practicesDataS3, ...practicesDataS4, ...practicesDataS5, ...practicesDataS6, ...practicesDataS7, ...practicesDataS8, ...practicesDataS9, ...practicesDataS10, ...practicesDataS11];
