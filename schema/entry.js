var entry = {
    "id": { type: Number },
    "tag": { type: String, validate: [function(){}, 'error msg'] },
    "title": { type: String, validate: [function(){}, 'error msg'] },
    "body": { type: String, validate: [function(){}, 'error msg'] },
    "user_agent": { type: String },
    "ip_address": { type: String },
    "publish": { type: Number, default: 0 },
    "date": { type: Date, default: Date.now }
    }
module.exports = entry;
