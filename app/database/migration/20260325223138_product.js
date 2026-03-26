export function up(knex) {
    return knex.schema.createTable('product', (table) => {
        table.bigIncrements('id').primary();
        table.text('descricao').notNullable();
        table.decimal('custo', 18, 4).notNullable();
        table.decimal('preco', 18, 4).notNullable();
        table.text('unidade').notNullable();
        table.string('codigo_barras').unique();
        table.boolean('ativo').defaultTo(true);
        table.boolean('excluido').defaultTo(false);
        table.timestamp('criado_em', { useTz: false }).defaultTo(knex.fn.now()) .comment('Data de criação do registro');
        table.timestamp('atualizado_em', { useTz: false }).defaultTo(knex.fn.now()) .comment('Data de última atualização do registro');
    });
}

export function down(knex) {
    return knex.schema.dropTable('product');
}