// oxlint-disable typescript/no-misused-promises typescript/strict-void-return
import type { PaginationPageChangeDetails } from "@chakra-ui/react";

import {
  ButtonGroup,
  Grid,
  Icon,
  IconButton,
  Pagination,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { ProductCard } from "@/features/products/components/product-card";
import { productsQueryOptions } from "@/features/products/queries";

export function ProductDisplay() {
  const routeApi = getRouteApi("/(layout)/products/");

  const { page } = routeApi.useSearch();

  const navigate = routeApi.useNavigate();

  const { data } = useSuspenseQuery(productsQueryOptions({ limit: 4, page }));

  async function handlePageChange(event: PaginationPageChangeDetails) {
    await navigate({
      search: () => ({ page: event.page }),
    });
  }

  return (
    <>
      <Grid
        gridTemplateColumns={{
          md: "repeat(4, 1fr)",
          sm: "repeat(2, 1fr)",
        }}
        gap="4"
      >
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      <Pagination.Root
        count={data.meta.total}
        pageSize={data.meta.itemsPerPage}
        defaultPage={1}
        page={page}
        onPageChange={handlePageChange}
        alignSelf="center"
      >
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <Icon size="sm">
                <ChevronLeftIcon />
              </Icon>
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.PageText format="long" />
          <Pagination.Items
            render={(pageItem) => (
              <IconButton variant={{ _selected: "outline", base: "ghost" }}>
                {pageItem.value}
              </IconButton>
            )}
          />
          <Pagination.NextTrigger asChild>
            <IconButton>
              <Icon size="sm">
                <ChevronRightIcon />
              </Icon>
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </>
  );
}
