interface ItemListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const ItemList = <T,>({ items, renderItem }: ItemListProps<T>) => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        <div className="flex-none self-stretch" key={index}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
