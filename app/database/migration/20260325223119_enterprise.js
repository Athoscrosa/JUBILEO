export function up(knex) {
    return knex.schema.createTable('enterprise', (table) => {
        table.bigIncrements('id').primary();
        table.text('fantasia').notNullable();
        table.text('razao_social').notNullable();
        table.text('cnpj');
        table.text('ie');
        table.boolean('ativo').defaultTo(true);
        table.boolean('excluido').defaultTo(false);
        table.timestamp('criado_em', { useTz: false }).defaultTo(knex.fn.now()) .comment('Data de criação do registro');
        table.timestamp('atualizado_em', { useTz: false }).defaultTo(knex.fn.now()) .comment('Data de última atualização do registro');
    });
}

export function down(knex) {
    return knex.schema.dropTable('enterprise');
}