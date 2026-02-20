let persistentUser = { name: "Alice" }; // lives long

function processTask() {
  const temp1 = { data: "short lived" }; // young generation
  const temp2 = { value: Math.random() }; // young generation

  return persistentUser.name;
}

setInterval(processTask, 10);

/*
When the program starts:

From Space:
[ persistentUser ]

Now the function runs once:

From Space:
[ persistentUser ][ temp1 ][ temp2 ]

Allocation is just pointer movement — extremely fast.

🧹 Step 2 — From-Space Fills → Minor GC Starts

After many function calls, From-Space becomes full.

Example state before GC:

From Space:
[ persistentUser ][ temp1 ][ temp2 ][ temp3 ][ temp4 ][ temp5 ]

But most temps are no longer referenced because the function finished.

Only this remains referenced:

persistentUser
🔍 Step 3 — GC Finds Live Objects

GC checks:

✔ stack references
✔ global references
✔ closures

Result:

Live:
persistentUser

Dead:
temp1 temp2 temp3 temp4 temp5
📦 Step 4 — Copy Survivors to To-Space

Now V8 copies only live objects:

To Space:
[ persistentUser ]

Dead objects are not copied.

Important:

👉 They are NOT individually deleted
👉 The entire old region will be discarded

This is why minor GC is fast.

🔁 Step 5 — Space Swap

Now the spaces swap roles.

Old From Space → erased
To Space → becomes new From Space

After swap:

From Space:
[ persistentUser ]

Clean memory.
Compact layout.
No fragmentation.

🔄 Step 6 — More Allocations Again

Function runs again:

From Space:
[ persistentUser ][ tempA ][ tempB ][ tempC ]

From Space fills again → minor GC runs again.

🧬 Step 7 — Object Survives Multiple Cycles (Aging)

Each time persistentUser survives a minor GC:

survival count++

Example:

Cycle 1 → survives
Cycle 2 → survives

Now V8 decides:

👉 this object is long-lived
👉 move it to Old Space

This is called promotion (or tenuring).

🟡 Step 8 — Promotion to Old Space

Now heap becomes:

Old Space:
[ persistentUser ]

New Space (From):
(empty)

Future minor GCs will NOT touch persistentUser.

New Space only handles fresh temporary objects.
*/
