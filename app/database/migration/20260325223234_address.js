export function up(knex) {
    return knex.schema.createTable('address', (table) => {
        table.bigIncrements('id').primary();
        
        // --- CHAVES ESTRANGEIRAS (Colunas) ---
        // A cidade é obrigatória para qualquer endereço
        table.integer('id_city').unsigned().notNullable(); 
        table.integer('id_customer').unsigned();
        table.integer('id_supplier').unsigned();
        table.integer('id_enterprise').unsigned();
        table.string('cep', 9); 
        table.string('logradouro', 255).notNullable();
        table.string('numero', 20).notNullable(); 
        
        table.string('complemento', 255);
        table.string('bairro', 100); 

        table.timestamps(true, true);

        // --- REGRAS DE RELACIONAMENTO (Agora dentro do bloco correto) ---
        table.foreign('id_city').references('id').inTable('city');
        table.foreign('id_customer').references('id').inTable('customer').onDelete('CASCADE');
        table.foreign('id_supplier').references('id').inTable('supplier').onDelete('CASCADE');
        table.foreign('id_enterprise').references('id').inTable('enterprise').onDelete('CASCADE');
    });
}

export function down(knex) {
    return knex.schema.dropTable('address');
}