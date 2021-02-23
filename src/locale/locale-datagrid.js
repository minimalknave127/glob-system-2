export const LocaleText = {
    //Root
    rootGridLabel: 'grid',
    noRowsLabel: 'Žádné výsledky',
    errorOverlayDefaultLabel: 'Vyskytl se error.',

    // Density selector toolbar button text
    toolbarDensity: 'Density',
    toolbarDensityLabel: 'Density',
    toolbarDensityCompact: 'Compact',
    toolbarDensityStandard: 'Standard',
    toolbarDensityComfortable: 'Comfortable',

    // Columns selector toolbar button text
    toolbarColumns: 'Columns',
    toolbarColumnsLabel: 'Show Column Selector',

    // Filters toolbar button text
    toolbarFilters: 'Filters',
    toolbarFiltersLabel: 'Show Filters',
    toolbarFiltersTooltipHide: 'Hide Filters',
    toolbarFiltersTooltipShow: 'Show Filters',
    toolbarFiltersTooltipActive: (count) => `${count} active filter(s)`,

    // Columns panel text
    columnsPanelTextFieldLabel: 'Najít sloupec',
    columnsPanelTextFieldPlaceholder: 'Název sloupce',
    columnsPanelDragIconLabel: 'Znovu seřadit sloupec',
    columnsPanelShowAllButton: 'Zobrazit vše',
    columnsPanelHideAllButton: 'Skrýt vše',

    // Filter panel text
    filterPanelAddFilter: 'Přidat filtr',
    filterPanelDeleteIconLabel: 'Odstranit',
    filterPanelOperators: 'Operátory',
    filterPanelOperatorAnd: 'a',
    filterPanelOperatorOr: 'nebo',
    filterPanelColumns: 'Sloupce',
    filterPanelInputLabel: 'Hodnota',
    filterPanelInputPlaceholder: 'Filtrovat hodnotu',

    // Filter operators text
    filterOperatorContains: 'obsahuje',
    filterOperatorEquals: 'se rovná',
    filterOperatorStartsWith: 'začína na',
    filterOperatorEndsWith: 'končí na',
    filterOperatorIs: 'je',
    filterOperatorNot: 'není',
    filterOperatorOnOrAfter: 'je na nebo za',
    filterOperatorBefore: 'je před',
    filterOperatorOnOrBefore: 'je na nebo před',

    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Zobrazit sloupec',
    columnMenuFilter: 'Filtrovat',
    columnMenuHideColumn: 'Skrýt',
    columnMenuUnsort: 'Neřadit',
    columnMenuSortAsc: 'Seřadit vzestupně',
    columnMenuSortDesc: 'Seřadit sestupně',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) => `${count} active filter(s)`,
    columnHeaderFiltersLabel: 'Zobrazit filtry',
    columnHeaderSortIconLabel: 'Seřadit',

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} položek vybráno`
            : `${count.toLocaleString()} položka vybrána`,

    // Total rows footer text
    footerTotalRows: 'Celkově položek:',

    // Pagination footer text
    footerPaginationRowsPerPage: 'Položek na stránku:',
};