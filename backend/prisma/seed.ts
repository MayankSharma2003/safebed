import prisma from "../src/libs/db";

const DEMO_DATE = "2026-09-15";

type Action = "LOW" | "HIGH";

type ScheduleEntry = {
  time: string;
  action: Action;
};

/*
  LOW  = On bed
  HIGH = Not on bed

  Every schedule:
  - starts at 00:00
  - alternates LOW/HIGH throughout the day
  - finishes naturally at 24:00
  - totals exactly 24 hours
*/

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

const espData: [string, string, number][] = [
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

/*
  GOOD
  ----
  BED-1 = 15h30m on bed
  BED-2 = 14h
  BED-3 = 13h
  BED-4 = 12h
*/

const schedules: Record<number, ScheduleEntry[]> = {
  484: [
    { time: "00:00", action: "LOW" },
    { time: "06:30", action: "HIGH" },
    { time: "07:30", action: "LOW" },
    { time: "09:30", action: "HIGH" },
    { time: "12:30", action: "LOW" },
    { time: "14:00", action: "HIGH" },
    { time: "16:30", action: "LOW" },
    { time: "18:00", action: "HIGH" },
    { time: "20:00", action: "LOW" },
  ],

  485: [
    { time: "00:00", action: "LOW" },
    { time: "06:00", action: "HIGH" },
    { time: "07:00", action: "LOW" },
    { time: "08:30", action: "HIGH" },
    { time: "12:00", action: "LOW" },
    { time: "13:30", action: "HIGH" },
    { time: "15:30", action: "LOW" },
    { time: "17:00", action: "HIGH" },
    { time: "20:30", action: "LOW" },
  ],

  486: [
    { time: "00:00", action: "LOW" },
    { time: "05:30", action: "HIGH" },
    { time: "06:30", action: "LOW" },
    { time: "08:00", action: "HIGH" },
    { time: "11:00", action: "LOW" },
    { time: "12:30", action: "HIGH" },
    { time: "14:30", action: "LOW" },
    { time: "16:00", action: "HIGH" },
    { time: "21:00", action: "LOW" },
  ],

  487: [
    { time: "00:00", action: "LOW" },
    { time: "05:00", action: "HIGH" },
    { time: "06:00", action: "LOW" },
    { time: "07:00", action: "HIGH" },
    { time: "10:00", action: "LOW" },
    { time: "11:30", action: "HIGH" },
    { time: "14:00", action: "LOW" },
    { time: "15:30", action: "HIGH" },
    { time: "21:00", action: "LOW" },
  ],

  /*
    MODERATE
    --------
    BED-5 = 10h30m
    BED-6 = 10h
    BED-7 = 9h30m
    BED-8 = 9h
  */

  488: [
    { time: "00:00", action: "LOW" },
    { time: "04:30", action: "HIGH" },
    { time: "06:00", action: "LOW" },
    { time: "07:00", action: "HIGH" },
    { time: "11:00", action: "LOW" },
    { time: "12:00", action: "HIGH" },
    { time: "15:00", action: "LOW" },
    { time: "16:00", action: "HIGH" },
    { time: "21:00", action: "LOW" },
  ],

  489: [
    { time: "00:00", action: "LOW" },
    { time: "04:00", action: "HIGH" },
    { time: "05:30", action: "LOW" },
    { time: "06:30", action: "HIGH" },
    { time: "10:00", action: "LOW" },
    { time: "11:00", action: "HIGH" },
    { time: "14:00", action: "LOW" },
    { time: "15:00", action: "HIGH" },
    { time: "21:00", action: "LOW" },
  ],

  490: [
    { time: "00:00", action: "LOW" },
    { time: "04:00", action: "HIGH" },
    { time: "06:00", action: "LOW" },
    { time: "07:00", action: "HIGH" },
    { time: "10:00", action: "LOW" },
    { time: "11:00", action: "HIGH" },
    { time: "15:00", action: "LOW" },
    { time: "16:00", action: "HIGH" },
    { time: "21:30", action: "LOW" },
  ],

  491: [
    { time: "00:00", action: "LOW" },
    { time: "03:30", action: "HIGH" },
    { time: "05:00", action: "LOW" },
    { time: "06:00", action: "HIGH" },
    { time: "10:00", action: "LOW" },
    { time: "11:00", action: "HIGH" },
    { time: "15:00", action: "LOW" },
    { time: "16:00", action: "HIGH" },
    { time: "21:30", action: "LOW" },
  ],

  /*
    POOR
    ----
    BED-9  = 8h
    BED-10 = 7h30m
    BED-11 = 7h
    BED-12 = 6h30m
  */

  492: [
    { time: "00:00", action: "LOW" },
    { time: "03:00", action: "HIGH" },
    { time: "05:00", action: "LOW" },
    { time: "06:00", action: "HIGH" },
    { time: "10:00", action: "LOW" },
    { time: "11:00", action: "HIGH" },
    { time: "15:00", action: "LOW" },
    { time: "16:00", action: "HIGH" },
    { time: "22:00", action: "LOW" },
  ],

  493: [
    { time: "00:00", action: "LOW" },
    { time: "03:00", action: "HIGH" },
    { time: "05:30", action: "LOW" },
    { time: "06:30", action: "HIGH" },
    { time: "11:00", action: "LOW" },
    { time: "12:00", action: "HIGH" },
    { time: "16:00", action: "LOW" },
    { time: "17:00", action: "HIGH" },
    { time: "22:30", action: "LOW" },
  ],

  494: [
    { time: "00:00", action: "LOW" },
    { time: "02:30", action: "HIGH" },
    { time: "05:00", action: "LOW" },
    { time: "06:00", action: "HIGH" },
    { time: "10:00", action: "LOW" },
    { time: "11:00", action: "HIGH" },
    { time: "15:00", action: "LOW" },
    { time: "16:00", action: "HIGH" },
    { time: "22:30", action: "LOW" },
  ],

  495: [
    { time: "00:00", action: "LOW" },
    { time: "02:30", action: "HIGH" },
    { time: "05:30", action: "LOW" },
    { time: "06:30", action: "HIGH" },
    { time: "11:00", action: "LOW" },
    { time: "12:00", action: "HIGH" },
    { time: "16:00", action: "LOW" },
    { time: "17:00", action: "HIGH" },
    { time: "23:00", action: "LOW" },
  ],
};

function demoTime(time: string): Date {
  return new Date(`${DEMO_DATE}T${time}:00+09:00`);
}

async function main() {
  console.log("🌱 Resetting SafeBed demo database...");

  /*
    Clear demo data in dependency-safe order.
    This prevents duplicate ESPs/mappings and duplicate logs
    when the seed is run again.
  */
  await prisma.alertLogs.deleteMany();
  await prisma.bedActivity.deleteMany();
  await prisma.esp_to_user_mapping.deleteMany();
  await prisma.esp.deleteMany();
  await prisma.users.deleteMany();

  console.log("✅ Previous demo data cleared");

  /*
    Users
  */
  await prisma.users.createMany({
    data: usersData,
  });

  console.log(`✅ Users seeded: ${usersData.length}`);

  /*
    ESP + user mapping
  */
  for (const [matId, espId, userId] of espData) {
    const esp = await prisma.esp.create({
      data: {
        matId,
        espId,
      },
    });

    await prisma.esp_to_user_mapping.create({
      data: {
        espId: esp.id,
        userId,
      },
    });
  }

  console.log(`✅ ESP mappings seeded: ${espData.length}`);

  /*
    Activity + alerts
  */
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

  for (const user of usersData) {
    const schedule = schedules[user.id];

    if (!schedule) {
      throw new Error(`Missing schedule for user ${user.id}`);
    }

    let highIndex = 0;

    for (const entry of schedule) {
      const time = demoTime(entry.time);

      bedActivities.push({
        userId: user.id,
        action: entry.action,
        time,
      });

      /*
        Every HIGH transition represents leaving the bed,
        therefore it also produces an alert.
      */
      if (entry.action === "HIGH") {
        /*
          Every patient has a mixture of handled and
          unhandled alerts for a more realistic demo.
        */
        const actionTaken = highIndex !== 1;

        alertLogs.push({
          userId: user.id,
          time,
          actionTaken,
          updatedAt: actionTaken
            ? new Date(time.getTime() + 5 * 60 * 1000)
            : time,
        });

        highIndex++;
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

  console.log("");
  console.log("📊 Expected analytics for 2026-09-15:");
  console.log("GOOD:");
  console.log("  BED-1  = 15h30m");
  console.log("  BED-2  = 14h");
  console.log("  BED-3  = 13h");
  console.log("  BED-4  = 12h");

  console.log("MODERATE:");
  console.log("  BED-5  = 10h30m");
  console.log("  BED-6  = 10h");
  console.log("  BED-7  = 9h30m");
  console.log("  BED-8  = 9h");

  console.log("POOR:");
  console.log("  BED-9  = 8h");
  console.log("  BED-10 = 7h30m");
  console.log("  BED-11 = 7h");
  console.log("  BED-12 = 6h30m");

  console.log("");
  console.log("🎉 SafeBed deterministic demo seed complete");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });