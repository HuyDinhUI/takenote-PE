export function generatePlaceholdeCard(column: any) {
    return {
        id: column.id+'-placeholder-card',
        FE_placeholderCard: true,
        columnId: column.id
    }
}