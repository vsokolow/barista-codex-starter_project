// =========================================================
// API CLIENT (MOCKED FOR FRONTEND TESTING)
// =========================================================

const API_BASE = 'http://localhost:3000/api';

export const apiClient = {
    // 1. GET LIST
    async getAllBeans() {
        const res = await fetch(`${API_BASE}/beans`);
        if (!res.ok) throw new Error('Failed to load beans');
        return res.json();
    },

        // КОГДА БУДЕТ БЭКЕНД, РАСКОММЕНТИРУЙ ЭТО:
        // const res = await fetch(`${API_BASE}/beans`);
        // return await res.json();
    // },

    // 2. GET DETAILS
    async getBeanById(id) {
        const res = await fetch(`${API_BASE}/beans/${id}`);
        if (!res.ok) throw new Error(`Bean not found: ${id}`);
        return res.json();
    },


    // // 3. CREATE
    // async createBean(beanData) {
    //     console.log('API: Creating bean...', beanData);
    //     mockBeans.push({ ...beanData, id: String(Date.now()), recipes: [] });
    // },

    // // 4. UPDATE
    // async updateBean(id, beanData) {
    //     console.log(`API: Updating bean ${id}...`, beanData);
    //     // Mock update logic needed for full test, but console log is enough for now
    // },

    // // 5. DELETE
   async deleteBean(id) {
    const res = await fetch(`${API_BASE}/beans/${id}` , { method: 'DELETE' });
        if (!res.ok) throw new Error(`Failed to delete bean: ${id}`);
    },
   

    // // 6. LOCALIZATION
    // async getTranslations(lang) {
    //     // Возвращаем пустой объект, пока нет бэкенда, чтобы не было ошибок 404
    //     return {};
    // }
};