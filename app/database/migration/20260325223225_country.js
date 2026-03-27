export function up(knex) {
    return knex.schema.createTable('country', (table) => {
        // Trocado para increments (inteiro normal já é mais que suficiente para países)
        table.increments('id').primary(); 
        
        // Códigos ISO costumam ter 2 ou 3 letras (ex: BR, BRA) ou DDI (+55)
        table.text('codigo').notNullable().unique(); 
        
        table.text('nome').notNullable().unique();
        
        // text ao invés de text
        table.text('localizacao').notNullable(); 
        table.text('lingua').notNullable(); // A duplicidade foi removida!
        
        // Moedas geralmente usam 3 letras (ex: BRL, USD, EUR)
        table.text('moeda').notNullable(); 
        // Mantive useTz: false para ficar igual às suas tabelas de estado e cidade
        table.timestamp('criado_em', { useTz: false })
             .defaultTo(knex.fn.now())
             .comment('Data de criação do registro');

        table.timestamp('atualizado_em', { useTz: false })
             .defaultTo(knex.fn.now())
             .comment('Data de atualização do registro');
    });
}

export function down(knex) {
    return knex.schema.dropTable('country');
}