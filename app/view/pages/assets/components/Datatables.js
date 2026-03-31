export class Datatables {
    static SetTable(selector, columns, options = {}) {
        return {
            getData(apiFn) {
                //por motivos de segurança verificamos se a tabela
                //ja foi iniciada.
                if ($.fn.DataTable.isDataTable(selector)) {
                    $(selector).DataTable().destroy();
                }
                const defaltConfig = {
                    paging: true,
                    lengthChange: true,
                    ordering: true,
                    info: true,
                    autoWidth: false,
                    responsive: true,
                    stateSave: true,
                    select: true,
                    searching: true,
                    processing: true,
                    serverSide: true,
                    language: {
                        url: 'https://cdn.datatables.net/plug-ins/2.3.6/i18n/pt-BR.json',
                        searchPlaceholder: 'Digite sua pesquisa...'
                    },

                    ajax: async (data, callback) => {
                        const filter = {
                            draw: data.draw,
                            term: data?.search?.value,
                            limit: data?.length,
                            offset: data?.start,
                            orderType: data.order[0]?.dir,
                            column: data.order[0]?.column
                        };
                        try {
                            const response = await apiFn(filter);
                            callback(response);
                        } catch (error) {
                            callback({
                                draw: data?.draw,
                                recordsTotal: 0,
                                recordsFiltered: 0,
                                data: []
                            });
                        }
                    },

                };
                //configuração final, do DataTable, que será mescladoa
                //Caso exista um configuração da tabela especifica.
                const finalConfig = { ...defaltConfig, ...options };
                if (!options.columns) {
                    finalConfig.columns = columns;
                }

                return $(selector).DataTable(finalConfig);
            }
        };
    }
}