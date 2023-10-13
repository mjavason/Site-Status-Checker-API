import { Request, Response } from 'express';
import { siteService, userService } from '../services';
import { SuccessResponse, InternalErrorResponse, NotFoundResponse } from '../helpers/response';
import { MESSAGES } from '../constants';
import logger from '../helpers/logger';
import { mailController } from './mail.controller';
import ApiService from '../services/api.service';

class Controller {
  // Create a new site
  async create(req: Request, res: Response) {
    const data = await siteService.create(req.body);

    if (!data) return InternalErrorResponse(res);

    return SuccessResponse(res, data);
  }

  // Get all sites with pagination
  async getAll(req: Request, res: Response) {
    let pagination = parseInt(req.params.pagination);

    if (!pagination) pagination = 1;

    pagination = (pagination - 1) * 10;

    const data = await siteService.getAll(pagination);

    if (!data) return InternalErrorResponse(res);
    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  // Get the count of sites
  async getCount(req: Request, res: Response) {
    const data = await siteService.getCount(req.query);

    // If nothing exists, return 0 as the count
    if (!data) return SuccessResponse(res, { data: 0 });

    return SuccessResponse(res, data);
  }

  // Find sites with specific criteria
  async find(req: Request, res: Response) {
    const data = await siteService.find(req.query);

    if (!data) return InternalErrorResponse(res);
    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  // Update an existing site
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await siteService.update({ _id: id }, req.body);

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.UPDATED);
  }

  // Soft delete a site
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await siteService.softDelete({ _id: id });

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.DELETED);
  }

  // Admins only: Hard delete a site
  async hardDelete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await siteService.hardDelete({ _id: id });

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.DELETED);
  }

  /**
   * Helper function to check the status of site links at specified intervals.
   *
   * @param {number} intervalInHours - The interval in hours to check.
   * @param {string} timeUnit - The time unit description (e.g., 'hourly', 'daily').
   */
  async checkSites(intervalInHours: number, timeUnit: string) {
    try {
      // Find sites where hourly_interval matches the specified time unit
      const sites = await siteService.find({
        hourly_interval: intervalInHours,
        status: 'active',
      });

      // If no matching sites are found, return early
      if (!sites || sites.length === 0) {
        logger.info(`No ${timeUnit} sites found.`);
        return;
      }

      // Iterate through the found sites
      for (const site of sites) {
        // Create an instance of the ApiService class for making external API calls
        const siteApiService = new ApiService(site.link);

        // Attempt to fetch data from the site's API
        const response = await siteApiService.get('/');
        console.log('Checked: ', site.title);
        console.log(response);

        // If there is no response from the site, handle the error
        if (!response) {
          const { user } = site;

          // Find the user's profile associated with the site
          const userProfile = await userService.findOne({ _id: user });

          // If the user profile is not found, log an error and return
          if (!userProfile) {
            logger.error('User account not found');
            return;
          }

          // Send a welcome mail and log the error
          await mailController.sendSiteDownNotificationMail(
            userProfile.email,
            site.title,
            site.link,
            userProfile.first_name,
          );

          logger.info(
            `Site: ${site.title} (${site.link}) for ${userProfile.first_name} ${
              userProfile.last_name
            } (${userProfile._id}) responded unfavorably on ${new Date()}`,
          );
        }
      }
    } catch (error: any) {
      // Handle any unexpected errors that may occur during the process
      logger.error(`Error while checking ${timeUnit} sites: ${error.message}`);
    }
  }
}

export const siteController = new Controller();
