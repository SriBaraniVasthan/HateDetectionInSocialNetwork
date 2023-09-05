
const Constant = {

    base_url: "http://localhost:8081/",
    //base_url: "https://students-social-network-backend-oryc3brmdq-uc.a.run.app/",
    instituteSideMenu: ["Departments", "Students", "Staffs"],
    userTypes: { ADMIN: "ADMIN", USER: "USER", STAFF: "STAFF", RECRUITER: "RECRUITER" },
    // toxicity_check_url: Referencing the API use from https://developers.perspectiveapi.com/s/ 
    toxicity_check_url: "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAmVruSbhjMhKapx4d83cq0oFmDhYhlAmY",
    pass: "PASS",
    fail: "FAIL",
    score: "SCORE",
    Alert: {
        ERROR: "error",
        WARNING: "warning",
        INFO: "info",
        SUCCESS: "success"
    },
    ToxicAlertText: "The content you are posting is against the community values",
    SuccessAlertText: ""
}

export default Constant;