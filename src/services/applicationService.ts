import SurveyRepository from "@repositories/applicationRepository";
import { application } from "@/types/default";
import { requestApplicationDto } from "@dtos/surveyDto";

const surveyRepository = new SurveyRepository();

class ApplicationService {
  async getApplicationByUserId(userId: string) {
    try {
      const application: application | null = await surveyRepository.findApplicationByUserId(userId);
      if (!application) {
        return ({
          ok: 0,
          message: "Application not exist"
        });
      }
      return ({
        ok: 1,
        message: "getApplicationByUserId success",
        application
      });
    } catch(err) {
      throw err;
    }
  }
  async addApplication(surveyDTO: requestApplicationDto) {
    try {
      if (!surveyDTO) {
        return ({
          ok:0,
          message: "Invalid request"
        });
      }
      await surveyRepository.createApplication(surveyDTO);
      return {
        ok: 1,
        message: "Survey Response Success"
      };
    } catch(err) {
      throw err;
    }
  }
  async updateApplication(surveyDTO: requestApplicationDto) {
    try {
      const application: application | null = await surveyRepository.findApplicationByUserId(surveyDTO.userId);
      if (application) {
        await surveyRepository.updateApplication(surveyDTO);
        return {
          ok: 1,
          message: "Survey Update Success"
        };
      }
    } catch (err) {
      throw err;
    }
  }
}

export default ApplicationService;