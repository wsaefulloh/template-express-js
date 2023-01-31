require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const expbs = require("express-handlebars");
const flash = require("express-flash");
const session = require("express-session");
const expressValidator = require("express-validator");
const methodOverride = require("method-override");
const helpers = require("handlebars-helpers")();

var fs = require("fs");
var http = require("http");
var https = require("https");

// Models
const db = require("./app/models");

const app = express();
//set dynamic views file
app.set("views", path.join(__dirname, "cms/views"));
// set layout
app.engine(
  "handlebars",
  expbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "cms/views/layout"),
    helpers: require("./cms/helpers/handlebars-helpers.js"),
  })
);
//set view engine
app.set("view engine", "handlebars");

let whiteList = ["http://localhost:8081"];
let corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// app.use(cors(corsOptions));
app.use(cors());
app.use(logger("dev"));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "secretpass123456" }));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(flash());
// app.use(expressValidator());
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body == "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "Public")));

// Sync database
db.sequelize.sync();

// cara aman jika ingin kirim foto
// app.get("/file/artikel/:name_file",function (req, res) {
//   const name_file = req.params.name_file;
//   res.sendFile(__dirname + "/Public/File/Artikel/" + name_file)
// });

// simple route
app.get("/", (req, res) => {
  res.redirect("/cms/login");
  // res.json({ message: "Welcome to Careeya REST API." });
});

app.get("/cms", (req, res) => {
  res.redirect("/cms/login");
});

// Routes DLP
require("./app/DLP/routes/course")(app);
require("./app/DLP/routes/program")(app);
require("./app/DLP/routes/DLP_router")(app);

// Routes CMS DLP
require("./cms/routes/DLP/dlp.routes")(app);
require("./cms/routes/DLP/program.routes")(app);
require("./cms/routes/DLP/course_quiz.routes")(app);
require("./cms/routes/DLP/course_video.routes")(app);
require("./cms/routes/DLP/course_book.routes")(app);
require("./cms/routes/DLP/know_program.routes")(app);
require("./cms/routes/DLP/program_type.routes")(app);
require("./cms/routes/DLP/program_job_level.routes")(app);
require("./cms/routes/DLP/program_benefit.routes")(app);
require("./cms/routes/DLP/program_language.routes")(app);

// Routes api careeya training
require("./app/routes/new_homepage.routes")(app);
require("./app/routes/employer_dynamic.routes")(app);
require("./app/routes/employer.routes")(app);
require("./app/routes/surveyV1.routes")(app);
require("./app/routes/survey.routes")(app);
require("./app/routes/catalog.routes")(app);
require("./app/routes/catalog_bookingdate.routes")(app);
require("./app/routes/catalog_transaction.routes")(app);
require("./app/routes/city.routes")(app);
require("./app/routes/state.routes")(app);
require("./app/routes/country.routes")(app);
require("./app/routes/work_status.routes")(app);
require("./app/routes/work_preference.routes")(app);
require("./app/routes/provider.routes")(app);
require("./app/routes/subject.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/user_latest_benefit.routes")(app);
require("./app/routes/user_expected_benefit.routes")(app);
require("./app/routes/user_work_experience.routes")(app);
require("./app/routes/user_education.routes")(app);
require("./app/routes/user_project.routes")(app);
require("./app/routes/user_certification.routes")(app);
require("./app/routes/user_document.routes")(app);
require("./app/routes/feedback.routes")(app);
require("./app/routes/m_gender.routes")(app);
require("./app/routes/m_role.routes")(app);
require("./app/routes/m_status_transaction.routes")(app);
require("./app/routes/m_status_user.routes")(app);
require("./app/routes/m_status_jobsearch.routes")(app);
require("./app/routes/m_status.routes")(app);

// Routes cms kerjakarya
require("./cms/routes/kerjakarya/skills.routes")(app);
require("./cms/routes/kerjakarya/benefit.routes")(app);
require("./cms/routes/kerjakarya/recruter_config.routes")(app);
require("./cms/routes/kerjakarya/about_us_consummer.routes")(app);
require("./cms/routes/kerjakarya/homepage_banner.routes")(app);
require("./cms/routes/kerjakarya/employer_dynamic.routes")(app);
require("./cms/routes/kerjakarya/employer.routes")(app);
require("./cms/routes/kerjakarya/ratting.routes")(app);
require("./cms/routes/kerjakarya/survey.routes")(app);
require("./cms/routes/kerjakarya/referral.routes")(app);
require("./cms/routes/kerjakarya/cms_user.routes")(app);
require("./cms/routes/kerjakarya/dashboard.routes")(app);
require("./cms/routes/kerjakarya/user.routes")(app);
require("./cms/routes/kerjakarya/job.routes")(app);
require("./cms/routes/kerjakarya/job_opportunity.routes")(app);
require("./cms/routes/kerjakarya/content.routes")(app);
require("./cms/routes/kerjakarya/faq.routes")(app);
require("./cms/routes/kerjakarya/faq_employer.routes")(app);
require("./cms/routes/kerjakarya/artikel.routes")(app);
require("./cms/routes/kerjakarya/contact.routes")(app);

require("./cms/routes/kerjakarya/interest.routes")(app);
require("./cms/routes/kerjakarya/pengetahuan.routes")(app);
require("./cms/routes/kerjakarya/keterampilan.routes")(app);
require("./cms/routes/kerjakarya/kemampuan.routes")(app);
require("./cms/routes/kerjakarya/karakter_kerja.routes")(app);
require("./cms/routes/kerjakarya/nilai_kerja.routes")(app);
require("./cms/routes/kerjakarya/catalog_training.routes")(app);

require("./cms/routes/kerjakarya/work_preference.routes")(app);
require("./cms/routes/kerjakarya/work_status.routes")(app);
require("./cms/routes/kerjakarya/city.routes")(app);
require("./cms/routes/kerjakarya/country.routes")(app);
require("./cms/routes/kerjakarya/education_level.routes")(app);
require("./cms/routes/kerjakarya/homepage.routes")(app);
require("./cms/routes/kerjakarya/job_zone.routes")(app);
require("./cms/routes/kerjakarya/kuisoner.routes")(app);
require("./cms/routes/kerjakarya/position.routes")(app);
require("./cms/routes/kerjakarya/provider.routes")(app);
require("./cms/routes/kerjakarya/state.routes")(app);
require("./cms/routes/kerjakarya/subject.routes")(app);
require("./cms/routes/kerjakarya/work_experience.routes")(app);

require("./cms/routes/kerjakarya/education.routes")(app);
require("./cms/routes/kerjakarya/industry.routes")(app);
require("./cms/routes/kerjakarya/job_function.routes")(app);
require("./cms/routes/kerjakarya/job_level.routes")(app);
require("./cms/routes/kerjakarya/company.routes")(app);
require("./cms/routes/kerjakarya/job_time.routes")(app);
require("./cms/routes/kerjakarya/job_type.routes")(app);
require("./cms/routes/kerjakarya/banner.routes")(app);
require("./cms/routes/kerjakarya/user_log.routes")(app);
require("./cms/routes/kerjakarya/rms.routes")(app);

require("./cms/routes/kerjakarya/work_assessment_type.routes")(app);
require("./cms/routes/kerjakarya/work_assessment_value.routes")(app);
require("./cms/routes/kerjakarya/work_assessment_question.routes")(app);

// Routes api careeya kerjakarya
require("./app/routes/kerjakarya/m_education_level.routes")(app);
require("./app/routes/kerjakarya/m_position.routes")(app);
require("./app/routes/kerjakarya/m_work_experience.routes")(app);
require("./app/routes/kerjakarya/m_interest.routes")(app);
require("./app/routes/kerjakarya/m_profile_question.routes")(app);
require("./app/routes/kerjakarya/user_answer_question.routes")(app);
require("./app/routes/kerjakarya/m_job.routes")(app);
require("./app/routes/kerjakarya/m_job_opportunity.routes")(app);

require("./app/routes/kerjakarya/m_pengetahuan.routes")(app);
require("./app/routes/kerjakarya/m_keterampilan.routes")(app);
require("./app/routes/kerjakarya/m_kemampuan.routes")(app);
require("./app/routes/kerjakarya/m_karakter_kerja.routes")(app);
require("./app/routes/kerjakarya/m_nilai_kerja.routes")(app);

require("./app/routes/kerjakarya/artikel.routes")(app);
require("./app/routes/kerjakarya/contact.routes")(app);
require("./app/routes/kerjakarya/content.routes")(app);
require("./app/routes/kerjakarya/faq.routes")(app);
require("./app/routes/kerjakarya/faq_employer.routes")(app);
require("./app/routes/kerjakarya/pesan.routes")(app);

require("./app/routes/kerjakarya/m_education.routes")(app);
require("./app/routes/kerjakarya/m_industry.routes")(app);
require("./app/routes/kerjakarya/m_job_function.routes")(app);
require("./app/routes/kerjakarya/m_job_level.routes")(app);
require("./app/routes/kerjakarya/m_company.routes")(app);
require("./app/routes/kerjakarya/m_job_time.routes")(app);
require("./app/routes/kerjakarya/m_job_type.routes")(app);
require("./app/routes/kerjakarya/user_apply_job.routes")(app);
require("./app/routes/kerjakarya/user_refer_friend.routes")(app);
require("./app/routes/kerjakarya/banner.routes")(app);
require("./app/routes/kerjakarya/user_log.routes")(app);
require("./app/routes/kerjakarya/notification.routes")(app);
require("./app/routes/kerjakarya/m_status_apply_job.routes")(app);
require("./app/routes/kerjakarya/user_work_assessment_question.routes")(app);

// cron auto logout service
require("./app/services/auto-logout")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
const PORT_HTTPS = process.env.PORT_HTTPS || 8443;

// your express configuration here

var httpServer = http.createServer(app);
httpServer.listen(PORT);

if (process.env.use_https == "true") {
  var privateKey = fs.readFileSync(process.env.privateKey_https, "utf8");
  var certificate = fs.readFileSync(process.env.certificate_https, "utf8");
  var credentials = { key: privateKey, cert: certificate };
  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(PORT_HTTPS);
}

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });
