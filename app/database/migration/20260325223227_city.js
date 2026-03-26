export function up(knex) {
    return knex.schema.createTable('city', (table) => {
        // ID padrão autoincremento
        table.increments('id').primary(); 
        
        // Aumentei um pouco o tamanho por segurança e REMOVI o .unique()
        table.string('nome', 80).notNullable(); 
        
        // O Código do IBGE da cidade sim é único no Brasil inteiro (tem 7 dígitos geralmente)
        table.integer('codigo_ibge').notNullable().unique(); 
        
        // --- RELACIONAMENTO COM O ESTADO (CHAVE ESTRANGEIRA) ---
        // 1. Cria a coluna que vai guardar o ID do estado (deve ser unsigned para bater com o increments)
        table.integer('id_federative_unit').unsigned().notNullable();
        
        // 2. Cria a regra da chave estrangeira conectando as tabelas
        table.foreign('id_federative_unit')
             .references('id')
             .inTable('federative_unit')
             .onUpdate('CASCADE')   // Se o ID do estado atualizar, atualiza aqui
             .onDelete('RESTRICT'); // Impede que um estado seja apagado se existirem cidades nele

        // Timestamps traduzidos (Note que nas tabelas anteriores usamos o padrão em inglês)
        table.timestamp('criado_em', { useTz: false }).defaultTo(knex.fn.now()).comment('Data de criação do registro');
        table.timestamp('atualizado_em', { useTz: false }).defaultTo(knex.fn.now()).comment('Data de última atualização do registro');
    });
}

export function down(knex) {
    return knex.schema.dropTable('city');
}