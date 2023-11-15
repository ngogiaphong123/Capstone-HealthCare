import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const conditions = [
    {
        name: 'AIDS',
        description: 'Acquired immunodeficiency syndrome',
    },
    {
        name: 'Alzheimer disease',
        description:
            'A progressive disease that destroys memory and other important mental functions.',
    },
    {
        name: 'Anemia',
        description:
            'A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body tissues.',
    },
    {
        name: 'Anxiety disorders',
        description:
            'A group of mental disorders characterized by significant feelings of anxiety and fear.',
    },
    {
        name: 'Arthritis',
        description:
            'Inflammation of one or more joints, causing pain and stiffness that can worsen with age.',
    },
    {
        name: 'Asthma',
        description:
            'A condition in which your airways narrow and swell and may produce extra mucus.',
    },
    {
        name: 'Atrial fibrillation',
        description:
            'An irregular and often rapid heart rate that can increase your risk of strokes, heart failure and other heart-related complications.',
    },
    {
        name: 'Autism spectrum disorder',
        description:
            'A condition related to brain development that impacts how a person perceives and socializes with others, causing problems in social interaction and communication.',
    },
    {
        name: 'Autoimmune hepatitis',
        description:
            'A disease in which your immune system attacks your liver cells.',
    },
    {
        name: 'Back pain',
        description:
            'Pain felt in the back that usually originates from the muscles, nerves, bones, joints or other structures in the spine.',
    },
    {
        name: 'Bipolar disorder',
        description:
            'A disorder associated with episodes of mood swings ranging from depressive lows to manic highs.',
    },
    {
        name: 'Breast cancer',
        description: 'A cancer that forms in the cells of the breasts.',
    },
    {
        name: 'Bronchitis',
        description:
            'Inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.',
    },
    {
        name: 'Carpal tunnel syndrome',
        description:
            'A condition that causes numbness, tingling and other symptoms in the hand and arm.',
    },
    {
        name: 'Celiac disease',
        description:
            'A digestive disorder triggered by gluten, a protein found in foods that contain wheat, barley or rye.',
    },
    // 100 more conditions added below
    {
        name: 'Chronic obstructive pulmonary disease (COPD)',
        description:
            'A chronic inflammatory lung disease that causes obstructed airflow from the lungs.',
    },
    {
        name: 'Cirrhosis',
        description:
            'A late stage of scarring (fibrosis) of the liver caused by many forms of liver diseases and conditions.',
    },
    {
        name: 'Colon cancer',
        description:
            'A cancer that occurs in the colon or rectum, which are parts of the large intestine.',
    },
    {
        name: 'Congestive heart failure',
        description:
            'A chronic progressive condition that affects the pumping power of your heart muscles.',
    },
    {
        name: 'Crohn disease',
        description:
            'A type of inflammatory bowel disease (IBD) that may affect any part of the gastrointestinal tract from mouth to anus.',
    },
    {
        name: 'Cystic fibrosis',
        description:
            'A progressive, genetic disease that causes persistent lung infections and limits the ability to breathe over time.',
    },
    {
        name: 'Dementia',
        description:
            'A general term for a decline in mental ability severe enough to interfere with daily life.',
    },
    {
        name: 'Depression',
        description:
            'A mental health disorder characterized by persistently depressed mood or loss of interest in activities, causing significant impairment in daily life.',
    },
    {
        name: 'Diabetes',
        description:
            'A group of diseases that affect how your body uses blood sugar (glucose).',
    },
    {
        name: 'Eczema',
        description: 'A condition that makes your skin red and itchy.',
    },
    {
        name: 'Endometriosis',
        description:
            'A disorder in which tissue similar to the tissue that normally lines the inside of your uterus grows outside your uterus.',
    },
    {
        name: 'Epilepsy',
        description:
            'A neurological disorder marked by sudden recurrent episodes of sensory disturbance, loss of consciousness, or convulsions, associated with abnormal electrical activity in the brain.',
    },
    {
        name: 'Fibromyalgia',
        description:
            'A disorder characterized by widespread musculoskeletal pain, fatigue, and tenderness in localized areas.',
    },
    {
        name: 'Gallstones',
        description: 'Hard deposits that form in your gallbladder.',
    },
    {
        name: 'Gastritis',
        description: 'Inflammation of the lining of the stomach.',
    },
    {
        name: 'Gastroesophageal reflux disease (GERD)',
        description:
            'A digestive disorder that affects the ring of muscle between the esophagus and stomach.',
    },
    {
        name: 'Glaucoma',
        description:
            'A group of eye conditions that damage the optic nerve, which is vital to good vision.',
    },
    {
        name: 'Gout',
        description:
            'A form of arthritis characterized by severe pain, redness, and tenderness in joints.',
    },
    {
        name: 'Graves disease',
        description:
            'An autoimmune disorder that causes hyperthyroidism, or overactive thyroid.',
    },
    {
        name: 'Hemorrhoids',
        description:
            'Swollen veins in your anus and lower rectum, similar to varicose veins.',
    },
    {
        name: 'Hepatitis',
        description: 'Inflammation of the liver.',
    },
    {
        name: 'Hernia',
        description:
            'A bulging of an organ or tissue through an abnormal opening.',
    },
    {
        name: 'Herpes',
        description:
            'A viral infection that causes sores or blisters on or around the mouth, genitals, or anus.',
    },
    {
        name: 'High blood pressure (hypertension)',
        description:
            'A common condition in which the force of the blood against your artery walls is high enough that it may eventually cause health problems.',
    },
    {
        name: 'HIV/AIDS',
        description:
            'A virus that attacks the immune system, leading to acquired immunodeficiency syndrome (AIDS).',
    },
    {
        name: 'Huntington disease',
        description:
            'An inherited condition that causes the progressive breakdown (degeneration) of nerve cells in the brain.',
    },
    {
        name: 'Hyperthyroidism',
        description:
            'A condition in which the thyroid gland produces too much of the hormone thyroxine.',
    },
    {
        name: 'Hypothyroidism',
        description:
            "A condition in which the thyroid gland doesn't produce enough of certain important hormones.",
    },
    {
        name: 'Inflammatory bowel disease (IBD)',
        description:
            'A term used to describe disorders that involve chronic inflammation of your digestive tract.',
    },
    {
        name: 'Insomnia',
        description:
            'A sleep disorder that makes it difficult to fall asleep or stay asleep.',
    },
    {
        name: 'Interstitial cystitis',
        description:
            'A chronic condition causing bladder pressure, bladder pain and sometimes pelvic pain.',
    },
    {
        name: 'Irritable bowel syndrome (IBS)',
        description:
            'A common disorder that affects the large intestine, causing abdominal pain, cramping, bloating, gas, diarrhea and constipation.',
    },
    {
        name: 'Kidney disease',
        description:
            "A condition in which your kidneys are damaged and can't filter blood the way they should.",
    },
    {
        name: 'Leukemia',
        description:
            "A cancer of blood-forming tissues, hindering the body's ability to fight infection.",
    },
    {
        name: 'Liver cancer',
        description: 'A cancer that begins in the cells of your liver.',
    },
    {
        name: 'Lupus',
        description:
            "A systemic autoimmune disease that occurs when your body's immune system attacks your own tissues and organs.",
    },
    {
        name: 'Lyme disease',
        description:
            'An infection caused by the bacterium Borrelia burgdorferi, which is transmitted to humans through the bite of infected blacklegged ticks.',
    },
    {
        name: 'Macular degeneration',
        description:
            'A condition that causes vision loss in the center of your visual field.',
    },
    {
        name: 'Malaria',
        description:
            'A mosquito-borne infectious disease that affects humans and other animals.',
    },
    {
        name: 'Melanoma',
        description:
            'A type of skin cancer that occurs when pigment-producing cells mutate and become cancerous.',
    },
    {
        name: 'Migraine',
        description:
            'A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.',
    },
    {
        name: 'Multiple sclerosis (MS)',
        description:
            'A potentially disabling disease of the brain and spinal cord (central nervous system).',
    },
    {
        name: 'Myasthenia gravis',
        description:
            'A neuromuscular disorder that causes weakness in the skeletal muscles, which are the muscles your body uses for movement.',
    },
    {
        name: 'Narcolepsy',
        description:
            'A chronic sleep disorder characterized by overwhelming daytime drowsiness and sudden attacks of sleep.',
    },
    {
        name: 'Non-Hodgkin lymphoma',
        description:
            'A cancer that originates in your lymphatic system, the disease-fighting network spread throughout your body.',
    },
    {
        name: 'Obesity',
        description:
            'A complex disorder involving an excessive amount of body fat.',
    },
    {
        name: 'Obsessive-compulsive disorder (OCD)',
        description:
            'A disorder characterized by unwanted repetitive thoughts (obsessions) and/or actions (compulsions).',
    },
    {
        name: 'Osteoarthritis',
        description:
            'A degenerative joint disease that affects the cartilage in your joints.',
    },
    {
        name: 'Osteoporosis',
        description:
            'A condition that weakens bones, making them fragile and more likely to break.',
    },
    {
        name: 'Ovarian cancer',
        description: 'A cancer that begins in the ovaries.',
    },
    {
        name: 'Overactive bladder',
        description: 'A condition that causes a sudden urge to urinate.',
    },
    {
        name: 'Pancreatic cancer',
        description: 'A cancer that begins in the pancreas.',
    },
    {
        name: 'Parkinson disease',
        description: 'A disorder of the nervous system that affects movement.',
    },
    {
        name: 'Pelvic inflammatory disease (PID)',
        description: 'An infection of the female reproductive organs.',
    },
    {
        name: 'Peptic ulcer',
        description:
            'A sore that develops on the lining of the esophagus, stomach, or small intestine.',
    },
    {
        name: 'Peripheral artery disease (PAD)',
        description:
            'A circulatory condition in which narrowed blood vessels reduce blood flow to your limbs.',
    },
    {
        name: 'Pneumonia',
        description:
            'An infection that inflames air sacs in one or both lungs, which may fill with fluid.',
    },
    {
        name: 'Polycystic ovary syndrome (PCOS)',
        description:
            'A hormonal disorder common among women of reproductive age.',
    },
    {
        name: 'Post-traumatic stress disorder (PTSD)',
        description:
            'A mental health condition triggered by a terrifying event.',
    },
    {
        name: 'Prostate cancer',
        description:
            'A cancer that occurs in the prostate, a small walnut-shaped gland in men that produces the seminal fluid that nourishes and transports sperm.',
    },
    {
        name: 'Psoriasis',
        description:
            'A skin condition that speeds up the life cycle of skin cells.',
    },
    {
        name: 'Rheumatoid arthritis (RA)',
        description:
            'A chronic inflammatory disorder affecting many joints, including those in the hands and feet.',
    },
    {
        name: 'Rosacea',
        description:
            'A common skin condition that causes redness and visible blood vessels in your face.',
    },
    {
        name: 'Schizophrenia',
        description:
            "A disorder that affects a person's ability to think, feel, and behave clearly.",
    },
    {
        name: 'Scoliosis',
        description:
            'A sideways curvature of the spine that occurs most often during the growth spurt just before puberty.',
    },
    {
        name: 'Sickle cell anemia',
        description:
            'A group of disorders that cause red blood cells to become misshapen and break down.',
    },
    {
        name: 'Sinusitis',
        description: 'Inflammation of the tissue lining the sinuses.',
    },
    {
        name: 'Skin cancer',
        description:
            'The abnormal growth of skin cells, most often triggered by sun exposure.',
    },
    {
        name: 'Sleep apnea',
        description:
            'A potentially serious sleep disorder in which breathing repeatedly stops and starts.',
    },
    {
        name: 'Stroke',
        description:
            'A medical emergency that occurs when blood flow to the brain is interrupted or reduced.',
    },
    {
        name: 'Testicular cancer',
        description: 'A cancer that occurs in the testicles.',
    },
    {
        name: 'Thyroid cancer',
        description:
            'A cancer that develops from the tissues of the thyroid gland.',
    },
    {
        name: 'Tinnitus',
        description: 'A ringing or buzzing in the ears.',
    },
    {
        name: 'Tuberculosis (TB)',
        description:
            'A potentially serious infectious disease that mainly affects your lungs.',
    },
    {
        name: 'Ulcerative colitis',
        description:
            'A chronic inflammatory bowel disease that causes inflammation in the digestive tract.',
    },
    {
        name: 'Urinary incontinence',
        description: 'The loss of bladder control.',
    },
    {
        name: 'Uterine cancer',
        description: 'A cancer that begins in the uterus.',
    },
    {
        name: 'Varicose veins',
        description: 'Enlarged, twisted veins that are visible under the skin.',
    },
    {
        name: 'Vertigo',
        description: 'A sensation of spinning dizziness.',
    },
    {
        name: 'Vulvodynia',
        description:
            'Chronic pain or discomfort around the opening of your vagina.',
    },
    {
        name: 'Wilson disease',
        description:
            'A rare inherited disorder that causes copper to accumulate in your liver, brain and other vital organs.',
    },
    {
        name: 'Yellow fever',
        description:
            'A viral infection spread by a particular type of mosquito.',
    },
    {
        name: 'Zika virus',
        description:
            'A mosquito-borne virus that can cause fever, rash, joint pain, and red eyes.',
    },
    {
        name: 'Zollinger-Ellison syndrome',
        description:
            'A rare condition in which one or more tumors form in your pancreas or the upper part of your small intestine (duodenum).',
    },
]

async function main() {
    for (const condition of conditions) {
        await prisma.condition.create({
            data: {
                name: condition.name,
                description: condition.description,
            },
        })
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
