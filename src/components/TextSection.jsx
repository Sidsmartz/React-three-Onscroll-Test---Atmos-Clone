import { Text } from "@react-three/drei";

export const TextSection = ({ title, subtitle, linkKey, links, ...props }) => {
  return (
    <group {...props}>
      {!!title && (
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY={"center"}
          fontSize={0.52}
          maxWidth={2.5}
        >
          {title}
        </Text>
      )}

      <Text
        color={"white"}
        anchorX={"left"}
        anchorY={"top"}
        position={[0, -0.66, 0]}
        fontSize={0.22}
        onClick={() => (window.location.href = links[linkKey])}
        onPointerOver={(e) => e.object.material.color.set("cyan")}
        onPointerOut={(e) => e.object.material.color.set("white")}
        maxWidth={2.5}
      >
        {subtitle}
      </Text>
    </group>
  );
};
