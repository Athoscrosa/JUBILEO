export function up(knex) {
    return knex.schema.createTable('federative_unit', (table) => {
        table.increments('id').primary(); 
        table.string('nome', 50).notNullable().unique(); 
        table.string('sigla', 2).notNullable().unique(); 
        
        // Sugestão: manter o código IBGE (Ex: 35 para SP)
        table.integer('codigo_ibge').notNullable().unique(); 
        
        table.timestamp('criado_em', { useTz: false }).defaultTo(knex.fn.now()).comment('Data de criação do registro');
        table.timestamp('atualizado_em', { useTz: false }).defaultTo(knex.fn.now()).comment('Data de última atualização do registro');
    });
}

export function down(knex) {
    return knex.schema.dropTable('federative_unit');
}