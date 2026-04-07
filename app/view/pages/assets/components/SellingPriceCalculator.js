class SellingPriceCalculator {
        #purchasePrice = 0;
        #totalTax = 0;
        #profitMargin = 0;
        #operatingCost = 0;

    static create() {
        return new SellingPriceCalculator();
    }

    addPurchasePrice(purchasePrice) {
        this.#purchasePrice = purchasePrice;
        return this;
    }

    addTotalTax(totalTax) {
        this.#totalTax = totalTax / 100;
        return this;
    }

    addProfitMargin(profitMargin) {
        this.#profitMargin = profitMargin / 100;
        return this;
    }

    operatingCost(operatingCost) {
        this.#operatingCost = operatingCost;
        return this;
    }

    getData() {
        const divisor = 1 - this.#totalTax - this.#profitMargin;
        const valorVendaSugerido = divisor > 0
            ? (this.#purchasePrice + this.#operatingCost) / divisor
            : 0;

        const valorTotalImposto = valorVendaSugerido * this.#totalTax;
        const valorMargem       = valorVendaSugerido * this.#profitMargin;

        return {
            valor_venda_sugerido: valorVendaSugerido,
            valor_total_imposto: valorTotalImposto,
            valor_margem_lucro: valorMargem
        };
    }
}