import axios from 'axios';

class ArticlesService {
  constructor() {
    this.basePath = '/api/articles';
  }

  async getNews(page) {
    const response = await axios.get(`${this.basePath}/news`, {
      params: {
        page
      }
    });
    return response.data;
  }

  async getNewsCount() {
    const response = await axios.get(`${this.basePath}/news/count`);
    return response.data;
  }
}

export default new ArticlesService();
