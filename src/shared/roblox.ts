import Object from '@rbxts/object-utils'

interface PartProperties {
  Position?: Vector3, Size?: Vector3,
  Color?: Color3,
  Transparency?: number,
  Anchored?: boolean,
}

//strict type this later
export function createPart(properties: { [key: string]: PartProperties }) {
  const part = new Instance("Part");
  Object.keys(properties).forEach(key => {
    (part as any)[key] = properties[key];
  });
  return part;
};
