import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const temperamentSchema = new Schema({
    colerico: {
        type: Number,
        required: [true, 'Colerico is required']
    },
    flematico: {
        type: Number,
        required: [true, 'Flematico is required']
    },
    melancolico: {
        type: Number,
        required: [true, 'Melancolico is required']
    },
    sanguineo: {
        type: Number,
        required: [true, 'Sanguineo is required']
    },
    supino: {
        type: Number,
        required: [true, 'Supino is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        autopopulate: { select: 'name email' }
    }
}, {
    timestamps: true,
});

temperamentSchema.post('save', async function (doc) {
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(
        doc.user,
        { $addToSet: { temperament: doc._id } }
    );
});

temperamentSchema.plugin(autopopulate);

const Temperament = mongoose.model('Temperament', temperamentSchema);

export default Temperament;