import ApplicationRepository from "@repositories/applicationRepository";
import { application } from "@/types/default";
import { EditApplicationAttendedAndFeePaidDtoType, requestApplicationDto } from "@dtos/surveyDto";

const applicationRepository = new ApplicationRepository();

class ApplicationService {
  async getAllApplication() {
    try {
      const application = await applicationRepository.findApplication();
      if (!application) {
        return ({
          ok: 0,
          message: "Application not exist"
        });
      }
      return ({
        ok: 1,
        message: "getAllApplication success",
        application
      });
    } catch(err) {
      throw err;
    }
  }
  async getApplicationByUserId(userId: string) {
    try {
      const application: application | null = await applicationRepository.findApplicationByUserId(userId);
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
      await applicationRepository.createApplication(surveyDTO);
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
      const application: application | null = await applicationRepository.findApplicationByUserId(surveyDTO.userId);
      if (application) {
        await applicationRepository.updateApplication(surveyDTO);
        return {
          ok: 1,
          message: "Survey Update Success"
        };
      }
    } catch (err) {
      throw err;
    }
  }
  async updateApplicationAttendedAndFeePaid(applicationDto: EditApplicationAttendedAndFeePaidDtoType) {
    try {
      await applicationRepository.updateApplicationAttendedAndFeePaid(applicationDto)
      return ({
        ok: 1,
        message: "updateApplicationAttendedAndFeePaid Success"
      })
    } catch (err) {
      throw err;
    }
  }
}

export default ApplicationService;