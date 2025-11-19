import DynamicSvgIcon from "../../svg/DynamicSvgIcon";
// @ts-ignore: MDX module not declared
import SkillsCode from "./SkillsCode.mdx";

const Skills = ({ skills, title }: any) => {
  return (
    <section className="grid md:grid-cols-2 h-full">
      <div className="border-r border-line overflow-auto md:block hidden">
        <SkillsCode />
      </div>
      <div className="overflow-auto px-4 py-4">
        <h3 className="lg:text-xl mb-4">{`//_${title}`}</h3>
        <div className="flex flex-wrap gap-10">
          {skills.map((skill: any) => {
            return (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center gap-2"
              >
                <DynamicSvgIcon
                  name={skill.icon}
                  className={`w-8 ${skill.color} flex-1`}
                />
                <p>{skill.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
