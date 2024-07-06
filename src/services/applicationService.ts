import SurveyRepository from "@repositories/surveyRepository";
import { application } from "@/types/default";
import { requestApplicationResponseDto } from "@dtos/surveyDto";

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
}

export default ApplicationService;