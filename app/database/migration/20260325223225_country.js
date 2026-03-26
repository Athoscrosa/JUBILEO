export function up(knex) {
    return knex.schema.createTable('country', (table) => {
        // Trocado para increments (inteiro normal já é mais que suficiente para países)
        table.increments('id').primary(); 
        
        // Códigos ISO costumam ter 2 ou 3 letras (ex: BR, BRA) ou DDI (+55)
        table.string('codigo', 5).notNullable().unique(); 
        
        table.string('nome', 100).notNullable().unique();
        
        // String ao invés de text
        table.string('localizacao', 100).notNullable(); 
        table.string('lingua', 50).notNullable(); // A duplicidade foi removida!
        
        // Moedas geralmente usam 3 letras (ex: BRL, USD, EUR)
        table.string('moeda', 3).notNullable(); 
        
        table.boolean('ativo').defaultTo(true);
        table.boolean('excluido').defaultTo(false);
        
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