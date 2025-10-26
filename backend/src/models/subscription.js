import mongoose from "mongoose";

const ProviderSubscriptionSchema = new mongoose.Schema({
    provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required:true
    },
    plan_name: {
        type: String,
        required:true,
        enum: ['Free', 'Plus']
    },
    status: {
        type: String,
        required: true,
        default: 'Active',
        enum: ['Active', 'Pending', 'Canceled', 'Expired', 'Trial']
    },
    start_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    end_date: {
        type: Date,
        required:true
    },
    transaction_id: {
        type: String,
        required:true,
        unique: true,
        trim: true
    },
    is_auto_renew: {
        type: Boolean,
        default: false
    }
}, { 
    // Index for quick lookups of a provider's current subscriptions
    indexes: [
        { provider_id: 1, status: 1 }
    ]
});

export const ProviderSubscriptionModel = mongoose.model('ProviderSubscription', ProviderSubscriptionSchema);