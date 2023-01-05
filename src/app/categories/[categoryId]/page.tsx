import { notFound } from "next/navigation";
import { use } from "react";
import Border from "../../../components/Border";
import BackButton from "../../../components/buttons/BackButton";
import PaginationButtons from "../../../components/buttons/PaginationButtons";
import CategoryHero from "../../../components/heros/CategoryHero";
import { PRODUCTS_PER_PAGE } from "../../../components/sections/AllProductsSection";
import FilterProductsByCategory from "../../../components/sections/FilterProductsByCategory";
import { fetchProductsByCategory } from "../../../handlers/fetchProductsByCategory";

interface PageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    page?: string;
  };
}

const CategoryIdPage = ({
  params: { categoryId },
  searchParams: { page },
}: PageProps) => {
  const pageNum = page ? parseInt(page) : 1;
  const skip = pageNum > 1 ? (pageNum - 1) * PRODUCTS_PER_PAGE : undefined;
  const { category, products } = use(fetchProductsByCategory(
    categoryId,
    PRODUCTS_PER_PAGE,
    skip
  ));

  if (!category) {
    return notFound();
  }

  return (
    <div>
      <BackButton routeTo={page ? "/" : undefined} />
      <Border />
      <CategoryHero category={category} />
      <FilterProductsByCategory category={category} products={products} />
      <PaginationButtons
        currentPage={pageNum}
        route={`/categories/${categoryId}`}
        disableNextPage={products.length < PRODUCTS_PER_PAGE}
      />
    </div>
  );
};

export default CategoryIdPage;
