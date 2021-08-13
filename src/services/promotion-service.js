import axios from 'axios';

class PromotionService {
  constructor() {
    this.basePath = '/api/promotion';
  }

  async getSlideShow() {
    const response = await axios.get(`${this.basePath}/slides`);
    return response.data;
  }
}

export default new PromotionService();
