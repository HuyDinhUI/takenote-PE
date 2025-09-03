export function generatePlaceholdeCard(column: any) {
    return {
        _id: column._id+'-placeholder-card',
        label: '',
        FE_placeholderCard: true,
        columnId: column._id,
        checklist:[]
    }
}