const Agenda = require("agenda");
const sendmail = require("./utils/sendmail");

const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI,
    collection: "agendaJobs"
  }
});

agenda.define("homework reminder", async (job) => {
  const { email, title, subject } = job.attrs.data;

  await sendmail(
    email,
    "homework reminder",
    `Reminder: your ${subject} homework "${title}" is due tomorrow`
  );
});

(async function () {
  await agenda.start();
  console.log("agenda started");
})();

module.exports = agenda;