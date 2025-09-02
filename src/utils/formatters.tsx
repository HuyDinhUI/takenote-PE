export function generatePlaceholdeCard(column: any) {
    return {
        _id: column._id+'-placeholder-card',
        FE_placeholderCard: true,
        columnId: column._id
    }
}