import styled from "styled-components";
import FormInput from "@/components/gui/FormInput";
import { useEffect, useState } from "react";
import type { FoodDTO } from "@/modules/foods/types/Food";
import { useApi } from "@/hooks/useApi";
import { debounce } from "lodash";

interface FoodPickerProps {
  onFoodPick: (food: FoodDTO) => void;
}

const InputWrapper = styled.div`
  border: 1px solid black;
  position: relative; /* needed so the dropdown is positioned below the input */
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%; /* right below the input */
  left: 0;
  width: 100%;
  max-height: 200px;

  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border: 1px solid red;
`;

const DropdownItem = styled.div`
  border: 1px solid black;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function FoodPicker({ onFoodPick }: FoodPickerProps) {
  const [foodSearch, setFoodSearch] = useState("");
  const [availableFoods, setAvailableFoods] = useState<FoodDTO[]>([]);
  const MIN_CHARS_TO_SEARCH = 1;

  const { execute, loading } = useApi<FoodDTO[]>({
    url: "/foods/search",
    method: "get",
  });

  useEffect(() => {
    if (foodSearch.length < MIN_CHARS_TO_SEARCH) return;

    const debouncedSearch = debounce(async () => {
      const results = await execute(undefined, { q: foodSearch });
      if (results) {
        console.log(results);
        setAvailableFoods(results);
      }
    }, 300);
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [foodSearch]);

  // Auto-search if total chars is 2+
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setFoodSearch(query);
    if (query.length < MIN_CHARS_TO_SEARCH) {
      setAvailableFoods([]);
      return;
    }
  };

  const addFoodToMeal = (food: FoodDTO) => {
    onFoodPick(food);
    setFoodSearch("");
    setAvailableFoods([]);
  };

  return (
    <InputWrapper>
      <FormInput
        name="foodquery"
        label={`Food Picker ${
          loading ? "(loading...)" : "(auto-search with 2+ chars)"
        } (searchResults.size: ${availableFoods.length})`}
        value={foodSearch}
        placeholder="Orange"
        required={false}
        onChange={handleSearchChange}
      />

      {foodSearch.length >= MIN_CHARS_TO_SEARCH &&
        availableFoods.length > 0 && (
          <Dropdown>
            {availableFoods.length === 0 && (
              <DropdownItem>No foods found</DropdownItem>
            )}
            {availableFoods.map((f) => (
              <DropdownItem key={f.id} onClick={() => addFoodToMeal(f)}>
                {f.name}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
    </InputWrapper>
  );
}
