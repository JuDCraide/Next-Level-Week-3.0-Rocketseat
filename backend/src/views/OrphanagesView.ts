import Orphanage from "../models/Orphanage";
import ImagesView from "./ImagesView";

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            phone: orphanage.phone,
            open_hours: orphanage.open_hours,
            open_on_weekends: orphanage.open_on_weekends,
            approved: orphanage.approved,
            images: ImagesView.renderMany(orphanage.images),
        }
    },

    renderApproved(orphanages: Orphanage[]) {
        return orphanages.map(orphanage =>
            orphanage.approved ? this.render(orphanage) : null
        );
    },
}