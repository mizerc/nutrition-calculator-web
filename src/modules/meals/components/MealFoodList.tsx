import styled from "styled-components";
import FormInput from "@/components/gui/FormInput";
import { useEffect, useState } from "react";
import type { Food } from "@/modules/foods/types/Food";
import { useApi } from "@/hooks/useApi";
import { debounce } from "lodash";

// Styled containers
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: "white";
  border-radius: 8px;
  padding: 2rem;
`;

const SubList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dashed black;
`;

const SubListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  min-height: 48px;
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
`;
const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
const InputWrapper = styled.div`
  position: relative; /* needed so the dropdown is positioned below the input */
  width: 300px; /* adjust as needed */
`;

export default function MealFoodList() {
  const [foodSearch, setFoodSearch] = useState("");
  const [availableFoods, setAvailableFoods] = useState<Food[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);

  const { execute } = useApi<Food[]>({
    url: "/foods/search",
    method: "get",
  });

  useEffect(() => {
    if (foodSearch.length < 2) return;

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

  // Search handler: only fetch/filter if 2+ chars
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setFoodSearch(query);

    if (query.length < 2) {
      setAvailableFoods([]);
      return;
    }
  };

  // Add selected food to meal list
  const addFoodToMeal = (food: Food) => {
    // prevent duplicates
    if (!selectedFoods.find((f) => f.id === food.id)) {
      setSelectedFoods([...selectedFoods, food]);
      setAvailableFoods([]);
    }
  };

  // Remove food from selected list
  const removeFoodFromMeal = (foodId: number) => {
    setSelectedFoods(selectedFoods.filter((f) => f.id !== foodId));
  };

  return (
    <ListContainer>
      <h2>Insert Food</h2>

      <InputWrapper>
        <FormInput
          label="Search"
          value={foodSearch}
          onChange={handleSearchChange}
        />

        {foodSearch.length >= 2 && availableFoods.length > 0 && (
          <Dropdown>
            {availableFoods.map((f) => (
              <DropdownItem key={f.id} onClick={() => addFoodToMeal(f)}>
                {f.name}
              </DropdownItem>
            ))}
            {availableFoods.length === 0 && (
              <DropdownItem>No foods found</DropdownItem>
            )}
          </Dropdown>
        )}
      </InputWrapper>

      {/* 
      <FormInput
        label="Search"
        value={foodSearch}
        onChange={handleSearchChange}
      />
      <SubList>
        <h3>Available Foods</h3>
        {availableFoods.map((f) => (
          <SubListItem key={f.id}>
            <span>{f.name}</span>
            <button type="button" onClick={() => addFoodToMeal(f)}>
              Add
            </button>
          </SubListItem>
        ))}

        {availableFoods.length === 0 && foodSearch.length >= 2 && (
          <SubListItem>No foods found</SubListItem>
        )}
      </SubList> */}

      <SubList style={{ marginTop: "1rem" }}>
        <h3>Selected Foods</h3>
        {selectedFoods.map((f) => (
          <SubListItem key={f.id}>
            <span>{f.name}</span>
            <button type="button" onClick={() => removeFoodFromMeal(f.id)}>
              Remove
            </button>
          </SubListItem>
        ))}

        {selectedFoods.length === 0 && (
          <SubListItem>No foods added yet</SubListItem>
        )}
      </SubList>
    </ListContainer>
  );
}
