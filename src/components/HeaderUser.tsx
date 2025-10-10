import styled from "styled-components";

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-weight: 500;
  color: #000000;
`;

function HeaderUser() {
  return (
    <UserProfile>
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="User Avatar" />
      <UserName>Pedro</UserName>
    </UserProfile>
  );
}
export default HeaderUser;