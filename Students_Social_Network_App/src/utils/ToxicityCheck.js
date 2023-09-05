import Axios from 'axios';
import Constant from '../constants/Constant';

const TOXICITY_LEVEL = 0.65

// This function return true if the given value is considered toxic with passing percentage as 65%
export async function CheckToxicity(value) {
    if (value) {
        let payload = {
            comment: {
                text: value
            },
            languages: ["en"],
            requestedAttributes: {
                FLIRTATION: {},
                INSULT: {},
                THREAT: {},
                TOXICITY: {}
            }
        }
         // Referencing the API use from https://developers.perspectiveapi.com/s/ 
         //Calls the perspective API and computes a score as part of business logic based on the response returned from the https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAmVruSbhjMhKapx4d83cq0oFmDhYhlAmY
        const response = await fetch(Constant.toxicity_check_url,
            {
                method: "POST",
                body: JSON.stringify(payload)
            })

        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            const responseJson = await response.json()
            let result = {}
            let attributeScores = responseJson.attributeScores

            Object.keys(attributeScores).map((item) => {
                result[item] = {}
                result[item][Constant.score] = attributeScores[item].summaryScore.value
                if (result[item][Constant.score] < TOXICITY_LEVEL) {
                    result[item][Constant.status] = Constant.pass
                }
                else {
                    result[item][Constant.status] = Constant.fail
                }
            })
            let levelCheck = Object.keys(result).filter(item => result[item][Constant.status] === Constant.fail)
            console.log("Final Verdict => ", levelCheck.length > 0)
            return levelCheck.length > 0
        }
    } else {
        return false
    }
}