// import prisma from "../src/libs/db";
// import { faker } from "@faker-js/faker";

// const START_ESP_NUMBER = 58;

// const JST_OFFSET = 9 * 60 * 60 * 1000;

// function toUTC(date: Date) {
//   return new Date(date.getTime() - JST_OFFSET);
// }

// async function main() {
//   console.log("🌱 Seeding started...");

//   await prisma.alertLogs.deleteMany();
//   await prisma.bedActivity.deleteMany();
//   await prisma.esp_to_user_mapping.deleteMany();
//   await prisma.esp.deleteMany();
//   await prisma.users.deleteMany();

//   // -------------------------
//   // 👤 USERS
//   // -------------------------
//   const users = [];

//   const roomStructure = [
//     { floor: "1", rooms: ["101", "102", "103"] },
//     { floor: "2", rooms: ["201", "202", "203"] },
//   ];

//   let bedCounter = 1;

//   for (const floorData of roomStructure) {
//     for (const room of floorData.rooms) {
//       for (let i = 0; i < 2; i++) {
//         const user = await prisma.users.create({
//           data: {
//             userName: faker.person.fullName(),
//             age: faker.number.int({ min: 60, max: 95 }),
//             gender: faker.helpers.arrayElement(["Male", "Female"]),
//             building: "B-1",
//             floor: floorData.floor,
//             room,
//             bed: `BED-${bedCounter}`,
//           },
//         });

//         users.push(user);
//         bedCounter++;
//       }
//     }
//   }

//   console.log(`✅ Users created: ${users.length}`);

//   // -------------------------
//   // 📡 ESP Mapping
//   // -------------------------
//   for (let i = 0; i < users.length; i++) {
//     const esp = await prisma.esp.create({
//       data: {
//         espId: `esp32-ff818c${START_ESP_NUMBER + i}`,
//         matId: `MAT-${faker.number.int({ min: 100, max: 999 })}`,
//       },
//     });

//     await prisma.esp_to_user_mapping.create({
//       data: {
//         espId: esp.id,
//         userId: users[i].id,
//       },
//     });
//   }

//   console.log("✅ ESP mapping done");

// // -------------------------
// // 🧠 USER PATTERN (MATCH SAMPLE DATA)
// // -------------------------

// const now = new Date();
// const jstNow = new Date(now.getTime() + JST_OFFSET);

// const baseStart = new Date(jstNow);
// baseStart.setDate(baseStart.getDate() - 1);

// const bedActivities: any[] = [];
// const alertLogs: any[] = [];

// for (const user of users) {
//   // Each user gets DIFFERENT start time (13:30–15:30)
//   let current = new Date(baseStart);
//   current.setHours(
//     faker.number.int({ min: 7, max:  10}),
//     faker.number.int({ min: 0, max: 59 }),
//     0,
//     0
//   );

//   let isHigh = false;

//   const push = (action: "HIGH" | "LOW", time: Date) => {
//     const utcTime = toUTC(time);

//     bedActivities.push({
//       userId: user.id,
//       action,
//       time: utcTime,
//     });

//     if (action === "HIGH") {
//       const actionTaken = faker.datatype.boolean(0.7);

//       alertLogs.push({
//         userId: user.id,
//         time: utcTime,
//         actionTaken,
//         updatedAt: actionTaken
//           ? new Date(utcTime.getTime() + 5 * 60000)
//           : utcTime,
//       });
//     }
//   };

//   // 1️⃣ START LOW (afternoon)
//   push("LOW", current);

//   // 2️⃣ HIGH after 2–4 hrs
//   current = new Date(current.getTime() + faker.number.int({ min: 120, max: 240 }) * 60000);
//   push("HIGH", current);

//   // 3️⃣ LOW after short break
//   current = new Date(current.getTime() + faker.number.int({ min: 15, max: 30 }) * 60000);
//   push("LOW", current);

//   // 4️⃣ HIGH evening
//   current = new Date(current.getTime() + faker.number.int({ min: 200, max: 360 }) * 60000);
//   push("HIGH", current);

//     current = new Date(current.getTime() + faker.number.int({ min: 50, max: 80 }) * 60000);
//     push("LOW", current);

//         current = new Date(current.getTime() + faker.number.int({ min: 70, max: 100 }) * 60000);
//     push("HIGH", current);

//   // 5️⃣ LOW sleep (long gap)
//   current = new Date(current.getTime() + faker.number.int({ min: 240, max: 360 }) * 60000);
//   push("LOW", current);

//   // 6️⃣ FINAL HIGH (natural wake — no fixed hour)
//   current = new Date(current.getTime() + faker.number.int({ min: 30, max: 60 }) * 60000);
//   push("HIGH", current);

//   // 7️⃣ OPTIONAL: complex users (like 103,105)
//   if (faker.datatype.boolean(0.35)) {
//     let extra = new Date(current);

//     const cycles = faker.number.int({ min: 2, max: 6 });

//     for (let i = 0; i < cycles; i++) {
//       extra = new Date(extra.getTime() + faker.number.int({ min: 20, max: 90 }) * 60000);

//       const action = i % 2 === 0 ? "LOW" : "HIGH";
//       push(action, extra);
//     }
//   }
// }

//   console.log(`📊 BedActivity: ${bedActivities.length}`);
//   console.log(`🚨 AlertLogs: ${alertLogs.length}`);

//   // -------------------------
//   // ⚡ INSERT
//   // -------------------------
//   await prisma.bedActivity.createMany({ data: bedActivities });
//   await prisma.alertLogs.createMany({ data: alertLogs });

//   console.log("✅ Done");
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());

// import prisma from "../src/libs/db";
// import { faker } from "@faker-js/faker";

// const JST_OFFSET = 9 * 60 * 60 * 1000;

// function toUTC(date: Date) {
//   return new Date(date.getTime() - JST_OFFSET);
// }

// async function main() {
//   console.log("🌱 Generating new activity logs (Append Mode)...");

//   // --- STEP 1: Fetch existing users from DB ---
//   // We don't delete them; we find the ones already mapped to ESPs.
//   const users = await prisma.users.findMany();

//   if (users.length === 0) {
//     console.error("❌ No users found. Please run your initial setup once first.");
//     return;
//   }

//   // --- STEP 2: Clear ONLY the logs for the CURRENT run if you want a clean TODAY, 
//   // OR just leave this commented out to keep every single log forever.
//   // await prisma.alertLogs.deleteMany(); 
//   // await prisma.bedActivity.deleteMany();

//   const now = new Date();
//   const jstNow = new Date(now.getTime() + JST_OFFSET);

//   const baseStart = new Date(jstNow);
//   baseStart.setHours(0, 0, 0, 0); 

//   const bedActivities: any[] = [];
//   const alertLogs: any[] = [];

//   for (const user of users) {
//     // --- YOUR ORIGINAL PATTERN LOGIC START ---
    
//     // Each user gets DIFFERENT start time (07:00–10:00)
//     let current = new Date(baseStart);
//     current.setHours(
//       faker.number.int({ min: 7, max: 10 }),
//       faker.number.int({ min: 0, max: 59 }),
//       0,
//       0
//     );

//     const push = (action: "HIGH" | "LOW", time: Date) => {
//       const utcTime = toUTC(time);

//       bedActivities.push({
//         userId: user.id, // Links to your existing fixed User ID
//         action,
//         time: utcTime,
//       });

//       if (action === "HIGH") {
//         const actionTaken = faker.datatype.boolean(0.7);

//         alertLogs.push({
//           userId: user.id,
//           time: utcTime,
//           actionTaken,
//           updatedAt: actionTaken
//             ? new Date(utcTime.getTime() + 1 * 60000)
//             : utcTime,
//         });
//       }
//     };

//     // 1️⃣ START LOW (morning/afternoon)
//     push("LOW", current);

//     // 2️⃣ HIGH after 2–4 hrs
//     current = new Date(current.getTime() + faker.number.int({ min: 120, max: 240 }) * 60000);
//     push("HIGH", current);

//     // 3️⃣ LOW after short break
//     current = new Date(current.getTime() + faker.number.int({ min: 15, max: 30 }) * 60000);
//     push("LOW", current);

//     // 4️⃣ HIGH evening
//     current = new Date(current.getTime() + faker.number.int({ min: 200, max: 360 }) * 60000);
//     push("HIGH", current);

//     current = new Date(current.getTime() + faker.number.int({ min: 50, max: 80 }) * 60000);
//     push("LOW", current);

//     current = new Date(current.getTime() + faker.number.int({ min: 70, max: 100 }) * 60000);
//     push("HIGH", current);

//     // 5️⃣ LOW sleep (long gap)
//     current = new Date(current.getTime() + faker.number.int({ min: 240, max: 360 }) * 60000);
//     push("LOW", current);

//     // 6️⃣ FINAL HIGH (natural wake)
//     current = new Date(current.getTime() + faker.number.int({ min: 30, max: 60 }) * 60000);
//     push("HIGH", current);

//     // 7️⃣ OPTIONAL: complex users
//     if (faker.datatype.boolean(0.35)) {
//       let extra = new Date(current);
//       const cycles = faker.number.int({ min: 2, max: 6 });

//       for (let i = 0; i < cycles; i++) {
//         extra = new Date(extra.getTime() + faker.number.int({ min: 20, max: 90 }) * 60000);
//         const action = i % 2 === 0 ? "LOW" : "HIGH";
//         push(action, extra);
//       }
//     }
//     // --- YOUR ORIGINAL PATTERN LOGIC END ---
//   }

//   console.log(`📊 Creating ${bedActivities.length} new BedActivity records...`);
//   console.log(`🚨 Creating ${alertLogs.length} new AlertLogs records...`);

//   // --- STEP 3: INSERT ONLY ---
//   // We use createMany to add new rows while keeping the old ones.
//   await prisma.bedActivity.createMany({ data: bedActivities });
//   await prisma.alertLogs.createMany({ data: alertLogs });

//   console.log("✅ Daily append completed successfully.");
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());


import prisma from "../src/libs/db";
import { faker } from "@faker-js/faker";

const JST_OFFSET = 9 * 60 * 60 * 1000;

function toUTC(date: Date) {
  return new Date(date.getTime() - JST_OFFSET);
}

/* -------------------------------------------------------------------------- */
/*                                  MASTER DATA                               */
/* -------------------------------------------------------------------------- */

const usersData = [
  {
    id: 484,
    userName: "佐藤 太郎",
    building: "B-1",
    floor: "1",
    room: "101",
    bed: "BED-1",
    age: 81,
    gender: "Female",
  },
  {
    id: 485,
    userName: "鈴木 花子",
    building: "B-1",
    floor: "1",
    room: "101",
    bed: "BED-2",
    age: 61,
    gender: "Male",
  },
  {
    id: 486,
    userName: "高橋 健",
    building: "B-1",
    floor: "1",
    room: "102",
    bed: "BED-3",
    age: 65,
    gender: "Female",
  },
  {
    id: 487,
    userName: "田中 美咲",
    building: "B-1",
    floor: "1",
    room: "102",
    bed: "BED-4",
    age: 87,
    gender: "Male",
  },
  {
    id: 488,
    userName: "伊藤 翔",
    building: "B-1",
    floor: "1",
    room: "103",
    bed: "BED-5",
    age: 83,
    gender: "Female",
  },
  {
    id: 489,
    userName: "渡辺 愛",
    building: "B-1",
    floor: "1",
    room: "103",
    bed: "BED-6",
    age: 87,
    gender: "Male",
  },
  {
    id: 490,
    userName: "山本 大輔",
    building: "B-1",
    floor: "2",
    room: "201",
    bed: "BED-7",
    age: 85,
    gender: "Male",
  },
  {
    id: 491,
    userName: "中村 優",
    building: "B-1",
    floor: "2",
    room: "201",
    bed: "BED-8",
    age: 70,
    gender: "Female",
  },
  {
    id: 492,
    userName: "小林 恒一",
    building: "B-1",
    floor: "2",
    room: "202",
    bed: "BED-9",
    age: 71,
    gender: "Male",
  },
  {
    id: 493,
    userName: "加藤 直子",
    building: "B-1",
    floor: "2",
    room: "202",
    bed: "BED-10",
    age: 61,
    gender: "Male",
  },
  {
    id: 494,
    userName: "吉田 恒一",
    building: "B-1",
    floor: "2",
    room: "203",
    bed: "BED-11",
    age: 76,
    gender: "Female",
  },
  {
    id: 495,
    userName: "山田 彩",
    building: "B-1",
    floor: "2",
    room: "203",
    bed: "BED-12",
    age: 82,
    gender: "Female",
  },
];

const espData = [
  ["MAT-837", "esp32-ff818c58", 484],
  ["MAT-254", "esp32-ff818c59", 485],
  ["MAT-680", "esp32-ff818c60", 486],
  ["MAT-145", "esp32-ff818c61", 487],
  ["MAT-929", "esp32-ff818c62", 488],
  ["MAT-114", "esp32-ff818c63", 489],
  ["MAT-276", "esp32-ff818c64", 490],
  ["MAT-747", "esp32-ff818c65", 491],
  ["MAT-803", "esp32-ff818c66", 492],
  ["MAT-499", "esp32-ff818c67", 493],
  ["MAT-206", "esp32-ff818c68", 494],
  ["MAT-831", "esp32-ff818c69", 495],
];

const DEMO_START = new Date("2026-09-15T00:00:00+09:00");

function at(minutes: number) {
  return new Date(DEMO_START.getTime() + minutes * 60 * 1000);
}

type Action = "LOW" | "HIGH";

const GOOD_SCHEDULE: { minutes: number; action: Action }[] = [
  { minutes: 0, action: "LOW" },       // 00:00
  { minutes: 360, action: "HIGH" },    // 06:00
  { minutes: 600, action: "LOW" },     // 10:00
  { minutes: 1080, action: "HIGH" },   // 18:00
];

const MODERATE_SCHEDULE: { minutes: number; action: Action }[] = [
  { minutes: 0, action: "LOW" },       // 00:00
  { minutes: 240, action: "HIGH" },    // 04:00
  { minutes: 600, action: "LOW" },     // 10:00
  { minutes: 960, action: "HIGH" },    // 16:00
];

const POOR_SCHEDULE: { minutes: number; action: Action }[] = [
  { minutes: 0, action: "LOW" },       // 00:00
  { minutes: 180, action: "HIGH" },    // 03:00
  { minutes: 660, action: "LOW" },     // 11:00
  { minutes: 960, action: "HIGH" },    // 16:00
];

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.alertLogs.deleteMany();
await prisma.bedActivity.deleteMany();
await prisma.esp_to_user_mapping.deleteMany();
await prisma.esp.deleteMany();

console.log("✅ Old demo activity cleared");

  /* ---------------------------------------------------------------------- */
  /*                               USERS                                    */
  /* ---------------------------------------------------------------------- */
//   await prisma.$executeRawUnsafe(`
// TRUNCATE TABLE
// "AlertLogs",
// "BedActivity"
// `);

  for (const user of usersData) {
    await prisma.users.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  console.log("✅ Users seeded");

  /* ---------------------------------------------------------------------- */
  /*                                 ESP                                    */
  /* ---------------------------------------------------------------------- */


  for (const [matId, espId, userId] of espData) {
    const esp = await prisma.esp.create({
      data: {
        matId : matId as string,
        espId : espId as string,
      },
    });

    await prisma.esp_to_user_mapping.upsert({
      where: {
        espId: esp.id,
      },
      update: {},
      create: {
        espId: esp.id,
        userId : userId as number,
      },
    });
  }

  console.log("✅ ESP & Mapping seeded");

  /* ---------------------------------------------------------------------- */
  /*                      ACTIVITY / ALERT (UNCHANGED)                      */
  /* ---------------------------------------------------------------------- */
const users = await prisma.users.findMany({
  orderBy: { id: "asc" },
});

const bedActivities: {
  userId: number;
  action: string;
  time: Date;
}[] = [];

const alertLogs: {
  userId: number;
  time: Date;
  actionTaken: boolean;
  updatedAt: Date;
}[] = [];

for (const user of users) {
  let schedule;

  if (user.id >= 484 && user.id <= 487) {
    schedule = GOOD_SCHEDULE;
  } else if (user.id >= 488 && user.id <= 491) {
    schedule = MODERATE_SCHEDULE;
  } else {
    schedule = POOR_SCHEDULE;
  }

  let alertNumber = 0;

  for (const item of schedule) {
    const time = at(item.minutes);

    bedActivities.push({
      userId: user.id,
      action: item.action,
      time,
    });

    if (item.action === "HIGH") {
      const actionTaken =
        (user.id + alertNumber) % 2 === 0;

      alertLogs.push({
        userId: user.id,
        time,
        actionTaken,
        updatedAt: actionTaken
          ? new Date(time.getTime() + 5 * 60 * 1000)
          : time,
      });

      alertNumber++;
    }
  }
}

await prisma.bedActivity.createMany({
  data: bedActivities,
});

await prisma.alertLogs.createMany({
  data: alertLogs,
});

console.log(`✅ BedActivity seeded: ${bedActivities.length}`);
console.log(`✅ AlertLogs seeded: ${alertLogs.length}`);
console.log("🎉 Demo date: 2026-09-15");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });