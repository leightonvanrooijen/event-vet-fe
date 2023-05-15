import {
  ListItemButton,
  ListItemText,
  Typography,
  List as MuiList,
  ListItem,
  Skeleton,
  Paper,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorDisplay } from "../Error/Error";

export const SkeletonList = () => {
  return (
    <MuiList>
      <ListItem>
        <ListItemText
          primary={<Skeleton width={100}></Skeleton>}
          secondary={<Skeleton width={60}></Skeleton>}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={<Skeleton width={100}></Skeleton>}
          secondary={<Skeleton width={60}></Skeleton>}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={<Skeleton width={100}></Skeleton>}
          secondary={<Skeleton width={60}></Skeleton>}
        />
      </ListItem>
    </MuiList>
  );
};

export type TListItem = {
  id: string;
  primaryText: string;
  secondaryText: string;
};
export const LoadedList = ({
  data,
  onClick,
}: {
  data: TListItem[];
  onClick: (id: string) => void;
}) => {
  return (
    <MuiList>
      {data.map((item) => {
        return (
          <ListItemButton key={item.id} onClick={() => onClick(item.id)}>
            <ListItemText
              primary={item.primaryText}
              secondary={item.secondaryText}
            />
          </ListItemButton>
        );
      })}
    </MuiList>
  );
};
export const List = ({
  isLoading,
  data,
  onItemClick,
  header,
  errorMessage,
}: {
  header: string;
  isLoading?: boolean;
  errorMessage?: string;
  data?: TListItem[];
  onItemClick: (id: string) => void;
}) => {
  return (
    <Paper style={{ height: "full", width: "10rem", padding: "0.75rem" }}>
      <Typography variant={"h5"}>{header}</Typography>
      {data && <LoadedList data={data} onClick={onItemClick} />}
      {isLoading && <SkeletonList />}
      {errorMessage && <ErrorDisplay message={errorMessage} />}
    </Paper>
  );
};
