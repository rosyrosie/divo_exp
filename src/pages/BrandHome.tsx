import useStore from "@useStore";

const BrandHome = () => {
  const { corpId } = useStore();

  return (
    <>{corpId}</>
  );
}

export default BrandHome;