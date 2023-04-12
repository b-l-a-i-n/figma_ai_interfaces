import axios from 'axios';
import { FIGMA_ACCESS_TOKEN } from './constants';

export const figmaApi = {
    async getFile() {
        const response = await axios.get('https://api.figma.com/v1/files/cTVO2TxgUYu4YHthO3GBvZ/', {
            headers: {
                'X-Figma-Token': FIGMA_ACCESS_TOKEN
            }
        })

        try {
            return response.data
        } catch (error) {
            console.dir(response);
            console.log('===========================');
            console.error(error.message)
        }
    }
} 