// This module manages the strict "1 Row per User, 10 JSON Columns" constraint.

const COLLECTION_NAME = 'it_tube_userdata_v1';

// Initial state for a new user
const DEFAULT_STATE = {
    slot_1: { // PLAYER_STATS
        money: 100,
        reputation: 50, // 0-100
        chaos: 0, // 0-100
        day: 1,
        xp: 0
    },
    slot_2: { // PLATFORM_STATE
        mood: "NEUTRAL", // NEUTRAL, ANGRY, MEME, DYSTOPIAN
        activeTrend: "None",
        serverHealth: 100,
    },
    slot_3: { // UNLOCKED_FEATURES
        canBan: true,
        canBoost: false,
        canEdit: false,
        autoModLevel: 0
    },
    slot_4: { // CREATOR_RELATIONSHIPS
        "GamerGod99": 50,
        "CatLover": 50,
        "CorporateShill": 50
    },
    slot_5: {}, // INVENTORY (Unused currently)
    slot_6: {}, // HISTORY_LOG
    slot_7: {}, // RESERVED
    slot_8: {}, // RESERVED
    slot_9: {}, // RESERVED
    slot_10: { // META
        version: 1.0,
        theme: "dark"
    }
};

class DataStore {
    constructor() {
        this.room = new WebsimSocket();
        this.userRecordId = null;
        this.localCache = { ...DEFAULT_STATE };
    }

    async init() {
        const currentUser = await window.websim.getCurrentUser();
        // Try to find existing record for this user
        // We filter by a unique field we set, or just search the list since we can only edit our own.
        const records = await this.room.collection(COLLECTION_NAME).getList();

        let myRecord = records.find(r => r.username === currentUser.username);

        if (!myRecord) {
            // Create the single row
            myRecord = await this.room.collection(COLLECTION_NAME).create({
                ...this._wrapSlots(DEFAULT_STATE)
            });
        }

        this.userRecordId = myRecord.id;
        this.localCache = this._unwrapSlots(myRecord);
        return this.localCache;
    }

    // Helper to format data for DB
    _wrapSlots(data) {
        const payload = {};
        for (let i = 1; i <= 10; i++) {
            const key = `slot_${i}`;
            payload[key] = {
                data: data[key] || {},
                _updated: new Date().toISOString()
            };
        }
        return payload;
    }

    // Helper to parse data from DB
    _unwrapSlots(record) {
        const state = {};
        for (let i = 1; i <= 10; i++) {
            const key = `slot_${i}`;
            // Handle cases where slot might be undefined or wrapped differently
            // Merge with DEFAULT_STATE to ensure critical fields (like mood) always exist
            state[key] = { ...(DEFAULT_STATE[key] || {}), ...(record[key]?.data || {}) };
        }
        return state;
    }

    // Main update method. 
    // We only update specific slots to minimize bandwidth, but in this specific schema
    // we assume the caller passes the modified slots.
    async update(slotIndex, newData) {
        if (!this.userRecordId) return;

        const slotKey = `slot_${slotIndex}`;

        // Update local cache immediately for UI responsiveness
        this.localCache[slotKey] = newData;

        const payload = {};
        payload[slotKey] = {
            data: newData,
            _updated: new Date().toISOString()
        };

        try {
            await this.room.collection(COLLECTION_NAME).update(this.userRecordId, payload);
        } catch (e) {
            console.error("Failed to sync slot " + slotIndex, e);
        }
    }

    get() {
        return this.localCache;
    }
}

export const db = new DataStore();