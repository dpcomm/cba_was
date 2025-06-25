import { Request, Response } from "express";
import ConsentService from "@services/consentService";
import logger from "@utils/logger";
import { requestCreateConsentDto } from "@dtos/consentDto";

const consentService = new ConsentService();

class ConsentController {
  async getAllConsents(req: Request, res: Response) {
    try {
      const { ok, message, consents } = await consentService.getAllConsents();
      if (ok) {
        logger.http("getAllConsents");
        return res.status(200).json({ message: "Success fetch consents", consents });
      }
      return res.status(404).json({ message });
    } catch (err: any) {
      logger.error("ConsentController.getAllConsents error", err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async getConsent(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const consentType = req.params.consentType;
      const { ok, message, consent } = await consentService.getConsent(userId, consentType);
      logger.http("getConsent");
      if (ok && consent) {
        return res.status(200).json({ message: "Success fetch consent", consent });
      }
      if (message === "Consent not found") {
        return res.status(200).json({ message: message, consent: null });
      }
      return res.status(404).json({ message });
    } catch (err: any) {
      logger.error("ConsentController.getConsent error", err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async createConsent(req: Request, res: Response) {
    try {
      console.log('Helo', req.body);
      const dto: requestCreateConsentDto = req.body;
      const { ok, message } = await consentService.createConsent(dto);
      if (ok) {
        logger.http("createConsent");
        return res.status(201).json({ message: "Success create consent" });
      }
      return res.status(400).json({ message });
    } catch (err: any) {
      logger.error("ConsentController.createConsent error", err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async updateConsent(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const consentType = req.params.consentType;
      const value: boolean = req.body.value;
      const { ok, message, consent } = await consentService.updateConsent(userId, consentType, value);
      if (ok) {
        logger.http("updateConsent");
        return res.status(200).json({ message: "Success update consent", consent });
      }
      return res.status(400).json({ message });
    } catch (err: any) {
      logger.error("ConsentController.updateConsent error", err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async deleteConsent(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const consentType = req.params.consentType;
      const { ok, message } = await consentService.deleteConsent(userId, consentType);
      if (ok) {
        logger.http("deleteConsent");
        return res.status(200).json({ message: "Success delete consent" });
      }
      return res.status(400).json({ message });
    } catch (err: any) {
      logger.error("ConsentController.deleteConsent error", err);
      return res.status(500).json({ message: err.message, err });
    }
  }
}

export default ConsentController;