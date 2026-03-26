export function up(knex) {
    return knex.schema.createTable('contact', (table) => {
        table.bigIncrements('id').primary();
        table.text('email').notNullable();
        table.text('telefone').notNullable();
        table.text('whatsapp');
        table.boolean('ativo').defaultTo(true);
        table.boolean('excluido').defaultTo(false);
        table.timestamp('criado_em', { useTz: false }).defaultTo(knex.fn.now()).comment('Data de criação do registro');
        table.timestamp('atualizado_em', { useTz: false }).defaultTo(knex.fn.now()).comment('Data de última atualização do registro');
    });
}

export function down(knex) {
    return knex.schema.dropTable('contact');
}