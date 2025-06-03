import { Product } from '@/@types/models';

const SORT_OPTIONS = {
  alphabeticalAscending: 'a-z',
  alphabeticalDescending: 'z-a',
  priceDescending: 'maior-preço',
  priceAscending: 'menor-preço',
  soldDescending: 'mais-vendido',
  ratingDescending: 'melhor-avaliado',
  newest: 'novo',
};

export function sortProducts(sortValue: string | null, products: Product[]) {
  switch (sortValue) {
    case SORT_OPTIONS.newest:
      return products.sort(
        (a, b) =>
          b.createdAt.toDate().valueOf() - a.createdAt.toDate().valueOf()
      );
    case SORT_OPTIONS.priceDescending:
      return products.sort((a, b) => b.price - a.price);
    case SORT_OPTIONS.ratingDescending:
      return products.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    case SORT_OPTIONS.soldDescending:
      return products.sort((a, b) => b.sales - a.sales);
    case SORT_OPTIONS.priceAscending:
      return products.sort((a, b) => a.price - b.price);
    case SORT_OPTIONS.alphabeticalDescending:
      return products.sort((a, b) => a.name.pt.localeCompare(b.name.pt) * -1);
    case SORT_OPTIONS.alphabeticalAscending:
    default:
      return products.sort((a, b) => a.name.pt.localeCompare(b.name.pt));
  }
}

export function filterProducts(
  filterValue: string[] | null,
  products: Product[]
) {
  return products.filter((product) => {
    if (!filterValue || filterValue.length === 0) return true;
    return filterValue.includes(product.category.value);
  });
}
