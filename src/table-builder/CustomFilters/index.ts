import { TextFilter } from "./TextFilter";
import { NumberFilter } from "./NumberFilter";
import { SelectFilter } from "./SelectFilter";

enum FilterTypes {
  TEXT_FILTER = "textFilter",
  NUMBER_FILTER = "numberFilter",
  DATE_FILTER = "dateFilter",
  ENUM_FILTER = "selectFilter",
}

export { TextFilter, NumberFilter, SelectFilter, FilterTypes };
